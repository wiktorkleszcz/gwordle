import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUsername,
} from "./signValidators";

function fieldError(meta: {
  isBlurred: boolean;
  isValid: boolean;
  errors: readonly unknown[];
}) {
  if (!meta.isBlurred || meta.isValid) return undefined;
  return meta.errors.map(String).join(", ");
}

export default function SignUp({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => validateEmail(value),
          onBlur: ({ value }) => validateEmail(value),
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
            error={fieldError(field.state.meta)}
          />
        )}
      </form.Field>
      <form.Field
        name="repeatPassword"
        validators={{
          onChangeListenTo: ["password"],
          onChange: ({ value, fieldApi }) =>
            validateRepeatPassword(
              value,
              fieldApi.form.getFieldValue("password"),
            ),
          onBlur: ({ value, fieldApi }) =>
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
