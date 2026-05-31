import logo from '#/img/a680dd9e-bc1e-406b-a61b-a4e7521f9721.png'
import Button from '#/components/Button'
import { Link } from '@tanstack/react-router'

// Header shows the logo and a navigation button; hover can notify the parent page.
type HeaderProps = {link: string, onHover?: (arg0: boolean) => void, classes: string}

export default function Header({link, onHover, classes}: HeaderProps) {
    return (
        <header className="flex h-16 items-center justify-center  rounded-2xl p-4 m-4 w-full justify-self-start">
             <img src={logo} alt="Logo" className="h-full w-auto" />
            <Link to={link} className="absolute right-4">
                <Button classes={classes} onMouseEnter={() => onHover ? onHover(true) : 0} onMouseLeave={() => onHover ? onHover(false) : 0}>Sign</Button>
            </Link>
        </header>
    )
}