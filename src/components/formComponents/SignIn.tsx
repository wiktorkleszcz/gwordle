import Input from "../Input";
import type { SignFormApi } from "./signFormTypes";
import {
  fieldError,
  passwordSchema,
  usernameSchema,
} from "./signValidators";

export default function SignIn({ form }: { form: SignFormApi }) {
  return (
    <>
      <form.Field
        name="username"
        validators={{
          onChange: usernameSchema,
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
          onChange: passwordSchema,
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
    </>
  );
}
