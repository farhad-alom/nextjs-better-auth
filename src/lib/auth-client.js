import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const {
    signIn,
    signUp,
    signOut,
    updateUser,
    requestPasswordReset,
    resetPassword,
    changePassword,
    useSession,

} = authClient

/**
 * sign up : register: create Account: first time user
 * sign in : already have account: repeated user
 * sign out and log out are the same.
 */