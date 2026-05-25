export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative z-10 flex h-16 items-center justify-center rounded-2xl p-4 m-4">
            {children}
        </div>
    )
}