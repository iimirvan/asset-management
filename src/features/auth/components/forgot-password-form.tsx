"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";
import { requestPasswordReset } from "@/features/auth/services/auth.service";

export function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async () => {
    await requestPasswordReset();
    setSuccessMessage("Password reset request submitted.");
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
      {successMessage ? (
        <p className="rounded-lg border border-success bg-success-muted px-3 py-2 text-sm font-semibold text-success">
          {successMessage}
        </p>
      ) : null}
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting" : "Submit"}
      </Button>
    </form>
  );
}
