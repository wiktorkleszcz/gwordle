export default function Form({children}: {children: React.ReactNode}) {
    return (
        <form action="" className="flex flex-col justify-between content-center p-6 bg-stone-900 w-lg gap-2 rounded-3xl">
            {children}
        </form>
    )
}