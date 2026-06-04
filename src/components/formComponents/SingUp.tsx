import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  emailSchema,
  fieldError,
  passwordSchema,
  SIGN_FIELD_DEBOUNCE_MS,
  validateRepeatPassword,
  usernameSchema,
} from "./signValidators";

export default function SignUp({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="email"
        validators={{
          onChangeAsyncDebounceMs: SIGN_FIELD_DEBOUNCE_MS,
          onChangeAsync: emailSchema,
        }}
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
        validators={{
          onChangeAsyncDebounceMs: SIGN_FIELD_DEBOUNCE_MS,
          onChangeAsync: usernameSchema,
        }}
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
        validators={{
          onChangeAsyncDebounceMs: SIGN_FIELD_DEBOUNCE_MS,
          onChangeAsync: passwordSchema,
        }}
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
