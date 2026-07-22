"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { login } from "@/features/auth/services/auth.service";
import { useSessionStore } from "@/stores/session-store";

export function LoginForm() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    try {
      const user = await login(values);
      setUser(user);
      router.push("/dashboard");
    } catch {
      setFormError("Unable to login. Please try again.");
    }
  });

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      <TextInput
        autoComplete="email"
        error={errors.email?.message}
        id="email"
        label="Email"
        placeholder="name@company.com"
        type="email"
        {...register("email")}
      />
      <TextInput
        autoComplete="current-password"
        error={errors.password?.message}
        id="password"
        label="Password"
        placeholder="Enter password"
        type="password"
        {...register("password")}
      />
      {formError ? (
        <p className="rounded-lg border border-danger bg-danger-muted px-3 py-2 text-sm font-semibold text-danger">
          {formError}
        </p>
      ) : null}
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in" : "Sign in"}
      </Button>
      <div className="text-center">
        <Link
          className="text-sm font-semibold text-primary hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary"
          href="/forgot-password"
        >
          Forgot password
        </Link>
      </div>
    </form>
  );
}
