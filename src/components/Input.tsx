export default function Input({desc}: {desc: string}) {
    return (
        <p className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-white">{desc}</label>
            <input className="w-full text-white text-2xl bg-black" type="text" />
        </p>
    )
}