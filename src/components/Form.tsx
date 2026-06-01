// Form provides the shared card layout used by form-like screens.
export default function Form({
  children,
  width,
}: {
  children: React.ReactNode;
  width: string;
}) {
  return (
    <form
      action=""
      className={`flex flex-col justify-between content-center p-6 bg-stone-800 ${width} gap-2 rounded-2xl shadow-outbox`}
    >
      {children}
    </form>
  );
}
