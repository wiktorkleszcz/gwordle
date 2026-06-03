// Input wraps a normal HTML input with an optional label and shared styling.
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  desc?: string;
  error?: string;
};

export default function Input({ desc, error, ...props }: InputProps) {
  return (
    <p className="flex flex-col gap-1 w-full">
      {desc && <label className="text-white">{desc}</label>}
      <input
        className="w-full text-white text-2xl bg-stone-800 p-2 rounded-md shadow-inbox"
        {...props}
      />
      {error && (
        <span className="text-red-400 text-sm" role="alert">
          {error}
        </span>
      )}
    </p>
  );
}
