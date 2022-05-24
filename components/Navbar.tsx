import Link from "next/link";
import { LoginButton } from "./LoginButton";
import { UserAvatar } from "./UserAvatar";

export function Navbar() {
    return (
        <nav>
            <div className="nav-left">
                <h1>
                    <Link href="/">
                        Festàpp
                    </Link>
                </h1>
            </div>
            <div>
                nome ovviamente WIP
            </div>
            <div className="nav-right">
                <LoginButton 
                    className="nav-telegram-login"
                    botName="festaappbot"
                />
                <UserAvatar/>
            </div>
        </nav>
    )
}