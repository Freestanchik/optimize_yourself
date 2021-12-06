import "./header.scss"
import {HeaderNav} from "./components/header-nav";
import {HeaderMain} from "./components/header-main";

export default function Header() {
    return (
        <header className={'header'}>
            <div className={'container'}>
                <HeaderMain/>
                <HeaderNav/>
            </div>
        </header>
    )
}