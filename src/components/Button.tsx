export default function Button({ children, classes }: { children: React.ReactNode, classes: string }) {
    return (
        <button className={classes}>
            {children}
        </button>
    )
}