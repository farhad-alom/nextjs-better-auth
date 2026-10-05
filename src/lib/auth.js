import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");

const resend = new Resend(process.env.RESEND_API_KEY);

// temporary check
console.log(
    "RESEND API KEY EXISTS:",
    !!process.env.RESEND_API_KEY
);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme<onboarding@resend.dev>',
                to: user.email,
                subject: "Reset Your Password",
                html: `
                <h3>Reset Your Password</h3>
                
                Click the link to reset your password: ${url}
                <p> Ignore this email if you haven't requested a password reset</p>
                `,
            })
        }
    },

    emailVerification: {
        // সাইনআপের সময় স্বয়ংক্রিয়ভাবে ইমেইল পাঠানোর জন্য
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 7 * 24 * 3600, // 7 days

        sendVerificationEmail: async ({ user, url }) => {
            console.log("VERIFY EMAIL TO:", user.email);
            console.log("VERIFY URL:", url);

            const { data, error } = await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify your email address",
                html: `
                    <h1>Please verify your email address</h1>
                    <p>
                        Click <a href="${url}">here</a> to verify your email.
                    </p>
                `,
            });

            console.log("RESEND DATA:", data);
            console.log("RESEND ERROR:", error);
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});