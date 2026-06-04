import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "Username is required")
  .min(3, "Username must be at least 3 characters");

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");

export function fieldError(meta: { errorMap: { onChange?: unknown } }) {
  const error = meta.errorMap.onChange;

  if (!error) return undefined;

  if (Array.isArray(error)) {
    const firstError = error[0];

    if (
      typeof firstError === "object" &&
      firstError !== null &&
      "message" in firstError
    ) {
      return String(firstError.message);
    }

    return String(firstError);
  }

  return String(error);
}

export function validateRepeatPassword(
  value: string,
  password: string,
) {
  if (!value) return "Repeat your password";
  if (value !== password) return "Passwords do not match";
  return undefined;
}
