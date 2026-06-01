import { createFileRoute, Link } from "@tanstack/react-router";
import Form from "#/components/Form";
import Input from "#/components/Input";
import Button from "#/components/Button";
import { useState } from "react";
import SignIn from "#/components/formComponents/SignIn";
import SignUp from "#/components/formComponents/SingUp";

// Sign route is a placeholder form screen with navigation into home or game.
export const Route = createFileRoute("/sign")({
  component: RouteComponent,
});

const buttonClasses =
  "bg-stone-800 w-full text-white p-3 rounded-md min-w-24 transition-colors shadow-outbox hover:shadow-inbox";

function RouteComponent() {
  const [hasAccount, setHasAccount] = useState(false);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-stone-800">
      {/* <h1 className='text-white'>Hello world</h1> */}
      <Form width="w-lg">
        <button className="flex self-start text-md p-2 rounded-md text-white shadow-outbox">
          {"<- go back"}
        </button>
        <h1 className="flex flex-row justify-center text-4xl m-10 text-white">
          {hasAccount ? "Sign In" : "Sign Up"}
        </h1>
        {hasAccount ? <SignIn /> : <SignUp />}
        <p className="flex flex-row justify-between gap-6 mt-10">
          <Button
            type="button"
            classes={buttonClasses}
            onClick={() => setHasAccount(!hasAccount)}
          >
            {hasAccount ? "I don't have an account" : "I have an account"}
          </Button>
          <Link to="/game" className="w-full">
            <Button classes={buttonClasses}>Test</Button>
          </Link>
        </p>
      </Form>
    </div>
  );
}
