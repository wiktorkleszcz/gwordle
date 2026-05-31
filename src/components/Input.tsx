// Input wraps a normal HTML input with an optional label and shared styling.
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    desc?: string
}

export default function Input({desc, ...props}: InputProps) {
    return (
        <p className="flex flex-col gap-1 w-full">
            {desc && <label className="text-white">{desc}</label>}
            <input className="w-full text-white text-2xl bg-stone-800 p-2 rounded-md shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),inset_-1px_-2px_4px_rgba(255,255,255,0.3)]" {...props} />
        </p>
    )
}