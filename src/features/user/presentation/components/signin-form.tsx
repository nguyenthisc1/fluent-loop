import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../shared/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../../../../shared/components/ui/field";
import { Input } from "../../../../shared/components/ui/input";
import { cn } from "../../../../shared/lib/utils";
import { useAuth } from "../auth/use-auth";
import { signInSchema, type SignInFormValues } from "../schemas/sign-in.schema";

export function SigninForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    try {
      const session = await signIn(values);
      console.log(session);

      if (session?.user?.onboardingCompleted) {
        navigate("/dashboard", { replace: true });
        return;
      }
      navigate("/onboarding", { replace: true });
    } catch (error) {
      // handle error (could show an error message)
      // For now, you could log the error (remove in prod)
      console.error(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
                {errors.email && <FieldDescription className="text-red-500">{errors.email.message as string}</FieldDescription>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required autoComplete="current-password" {...register("password")} aria-invalid={!!errors.password} />
                {errors.password && <FieldDescription className="text-red-500">{errors.password.message as string}</FieldDescription>}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
