'use client';
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";
// import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField, InputGroup } from "@heroui/react";
import { useState } from "react";
import Link from "next/link";


const SignInPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("FORM ER DATA", data);

        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: '/'
        })

        console.log("After submit Sign-In", resData, data);
        // Convert FormData to plain object
    };



    return (
        <div>
            <h2>Please Sign In</h2>


            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                {/* Email Field */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                {/* Password Field */}
                <TextField
                    isRequired
                    name="password"
                    minLength={8}
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>

                    <InputGroup>
                        <InputGroup.Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pe-10"
                        />
                        <InputGroup.Suffix className="pe-1">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                onPress={() => setIsVisible((prev) => !prev)}
                                className="text-default-400 hover:text-default-600 data-[hover=true]:bg-transparent"
                            >
                                {isVisible ? (
                                    <EyeSlash className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <FieldError />
                    <Description>
                        Must be at least 8 characters with 1 uppercase letter and 1 number
                    </Description>
                </TextField>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

            <p><small>Forgot Password ? <Link
                className="text-blue-400 underline"
                href="/forgot-password">Click Here</Link></small></p>
        </div>
    );
};

export default SignInPage;