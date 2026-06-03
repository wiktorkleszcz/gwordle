import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import { validatePassword, validateUsername } from "./signValidators";

function fieldError(meta: {
  isBlurred: boolean;
  isValid: boolean;
  errors: readonly unknown[];
}) {
  if (!meta.isBlurred || meta.isValid) return undefined;
  return meta.errors.map(String).join(", ");
}

export default function SignIn({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="username"
        validators={{
          onChange: ({ value }) => validateUsername(value),
          onBlur: ({ value }) => validateUsername(value),
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
          onChange: ({ value }) => validatePassword(value),
          onBlur: ({ value }) => validatePassword(value),
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
            // error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
    </>
  );
}
