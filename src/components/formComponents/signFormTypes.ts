import type { ReactFormExtendedApi } from "@tanstack/react-form";

export type SignFormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignFormApi = ReactFormExtendedApi<
  SignFormValues,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
>;
