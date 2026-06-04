import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  debouncedFieldValidators,
  fieldError,
  SIGN_FIELD_DEBOUNCE_MS,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUsername,
} from "./signValidators";

export default function SignUp({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="email"
        validators={debouncedFieldValidators(validateEmail)}
      >
        {(field) => (
          <Input
            type="email"
            desc="Email"
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
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
      <form.Field
        name="repeatPassword"
        validators={{
          onChangeListenTo: ["password"],
          onChangeAsyncDebounceMs: SIGN_FIELD_DEBOUNCE_MS,
          onChangeAsync: ({ value, fieldApi }) =>
            validateRepeatPassword(
              value,
              fieldApi.form.getFieldValue("password"),
            ),
        }}
      >
        {(field) => (
          <Input
            type="password"
            desc="Repeat password"
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
