import Input from "../Input";

export default function SignUp() {
  return (
    <>
      <Input type="email" desc="Email" />
      <Input desc="Username" />
      <Input type="password" desc="Password" />
      <Input type="password" desc="Repeat password" />
    </>
  );
}
