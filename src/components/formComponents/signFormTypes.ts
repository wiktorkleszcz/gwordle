import { useForm } from "@tanstack/react-form";

export type SignFormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const signFormDefaultValues: SignFormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

function signFormForType() {
  return useForm({ defaultValues: signFormDefaultValues });
}

export type SignFormApi = ReturnType<typeof signFormForType>;
