type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    desc?: string
}

export default function Input({desc, ...props}: InputProps) {
    return (
        <p className="flex flex-col gap-1 w-full">
            {desc && <label className="text-white">{desc}</label>}
            <input className="w-full text-white text-2xl bg-black p-2 rounded-md" {...props} />
        </p>
    )
}