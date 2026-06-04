import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  fieldError,
  passwordSchema,
  SIGN_FIELD_DEBOUNCE_MS,
  usernameSchema,
} from "./signValidators";

export default function SignIn({
  form,
}: {
  form: SignFormApi;
}) {
  return (
    <>
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
            onChange={(e) =>
              field.handleChange(e.target.value)
            }
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
            onChange={(e) =>
              field.handleChange(e.target.value)
            }
            error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
    </>
  );
}
