import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import Form from "#/components/Form";
import Button from "#/components/Button";
import { useState } from "react";
import SignIn from "#/components/formComponents/SignIn";
import SignUp from "#/components/formComponents/SingUp";
import { useForm } from "@tanstack/react-form";
import type { SignFormValues } from "#/components/formComponents/signFormTypes";

// Sign route is a placeholder form screen with navigation into home or game.
export const Route = createFileRoute("/sign")({
  component: RouteComponent,
});

const buttonClasses =
  "bg-stone-800 w-full text-white p-3 rounded-md min-w-24 transition-colors shadow-outbox hover:shadow-inbox";

const defaultValues: SignFormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

function RouteComponent() {
  const [hasAccount, setHasAccount] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    onSubmit: () => {
      navigate({ to: "/game" });
    },
  });

  function toggleAccountMode() {
    setHasAccount((prev) => !prev);
    form.reset();
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-800">
      <Form
        width="w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Link to="/">
          <button
            type="button"
            className="flex self-start text-md p-2 rounded-md text-white shadow-outbox"
          >
            {"<- go back"}
          </button>
        </Link>
        <h1 className="flex flex-row justify-center text-4xl m-10 text-white">
          {hasAccount ? "Sign In" : "Sign Up"}
        </h1>
        {hasAccount ? <SignIn form={form} /> : <SignUp form={form} />}
        <p className="flex flex-row justify-between gap-6 mt-10">
          <Button
            type="button"
            classes={buttonClasses}
            onClick={toggleAccountMode}
          >
            {hasAccount
              ? "I don't have an account"
              : "I have an account"}
          </Button>
          <form.Subscribe
            selector={(state) => state.canSubmit}
            children={(canSubmit) => (
              <Button
                type="submit"
                classes={buttonClasses}
                disabled={!canSubmit}
              >
                {hasAccount ? "Log in" : "Sign up"}
              </Button>
            )}
          />
        </p>
      </Form>
    </div>
  );
}
