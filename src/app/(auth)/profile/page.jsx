"use client";

import { updateUser } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    toast,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
    TextArea,
} from "@heroui/react";

export default function ProfilePage() {

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const resData = await updateUser({
            name: userData.name
        });

        toast.success("Profile update successfully", {
            description: "Your profile has been updated",
        });

        // alert("Form submitted successfully!");
    };

    return (
        <Form className="w-full max-w-96" onSubmit={handleUpdateUser}>
            <Fieldset>
                <Fieldset.Legend>Profile Settings</Fieldset.Legend>
                <Description>Update your profile information.</Description>
                <FieldGroup>
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }

                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input placeholder="John Doe" />
                        <FieldError />
                    </TextField>

                </FieldGroup>
                <Fieldset.Actions>


                    {/* <Button type="submit">
                        <FloppyDisk />
                        Save changes
                    </Button> */}
                    <Button
                        size="sm"
                        variant="secondary"
                        color="primary"
                        onPress={() => {
                            const id = toast.success("Profile updated successfully", {
                                description: "Your profile has been updated.",
                                actionProps: {
                                    children: "Done",
                                    className:
                                        "bg-emerald-500 text-white hover:bg-emerald-600 font-medium",
                                    onPress: () => toast.close(id),
                                },
                            });
                        }}
                    >
                        Save Changes
                    </Button>

                    <Button type="reset" variant="secondary">
                        Cancel
                    </Button>
                </Fieldset.Actions>
            </Fieldset>
        </Form>
    );
}
/*
When users are not logged in , i dont want show them this profile page. if peoples are logged in , i will show them this page.
 */