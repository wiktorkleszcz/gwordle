import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  debouncedFieldValidators,
  fieldError,
  validatePassword,
  validateUsername,
} from "./signValidators";

export default function SignIn({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="username"
        validators={debouncedFieldValidators(validateUsername)}
      >
        {(field) => (
          <Input
            desc="Username"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
      <form.Field
        name="password"
        validators={debouncedFieldValidators(validatePassword)}
      >
        {(field) => (
          <Input
            type="password"
            desc="Password"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
    </>
  );
}
