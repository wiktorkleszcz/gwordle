import Input from "../Input";

export default function SignIn() {
  return (
    <>
      <Input
        desc="Username"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
      <Input type="password" desc="Password" />
    </>
  );
}
