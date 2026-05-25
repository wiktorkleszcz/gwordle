type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes: string
}

export default function Button({ children, classes, ...props }: ButtonProps) {
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}