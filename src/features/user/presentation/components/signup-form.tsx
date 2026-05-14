import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../shared/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../../../../shared/components/ui/field";
import { Input } from "../../../../shared/components/ui/input";
import { useAuth } from "../auth/use-auth";
import { useUserErrorToast } from "../hooks/use-user-error-toast";
import { signUpSchema, type SignUpFormValues } from "../schemas/sign-up.schema";

// Assumed from schema: SignUpFormValues = { email: string; password: string; confirmPassword: string; }
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { showError } = useUserErrorToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleValidSubmit(values: SignUpFormValues) {
    try {
      await signUp(values);

      toast.success("Account created", {
        description: "Let’s set up your learning profile.",
      });

      navigate("/onboarding", {
        replace: true,
      });
    } catch (error) {
      showError(error);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleValidSubmit)}>
          <FieldGroup>
            {/* No full name field in form, so treat as plain uncontrolled input */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...form.register("email")} required autoComplete="email" />
              <FieldDescription>We&apos;ll use this to contact you. We will not share your email with anyone else.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...form.register("password")} required autoComplete="new-password" />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" {...form.register("confirmPassword")} required autoComplete="new-password" />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Create Account
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
