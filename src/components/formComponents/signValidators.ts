const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(value: string) {
  if (!value.trim()) return "Username is required";
  if (value.trim().length < 3) {
    return "Username must be at least 3 characters";
  }
  return undefined;
}

export function validateEmail(value: string) {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email";
  return undefined;
}

export function validatePassword(value: string) {
  if (!value) return "Password is required";
  if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return undefined;
}

export function validateRepeatPassword(
  value: string,
  password: string,
) {
  if (!value) return "Repeat your password";
  if (value !== password) return "Passwords do not match";
  return undefined;
}
