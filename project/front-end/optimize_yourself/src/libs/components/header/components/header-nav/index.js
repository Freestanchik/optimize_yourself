import {NavLink} from "react-router-dom";

export const HeaderNav = () => {
    return (
        <nav>
            <ul className={'header__nav'}>
                <li>
                    <NavLink
                        className={'header__nav-elem'}
                        activeClassName={'header__nav-elem_active'}
                        exact to={"/"}
                    >
                        Прогноз погоди
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={'header__nav-elem'}
                        activeClassName={'header__nav-elem_active'}
                        to={"/TodoList"}
                    >
                        Мої справи
                    </NavLink></li>
            </ul>
        </nav>
    )
}