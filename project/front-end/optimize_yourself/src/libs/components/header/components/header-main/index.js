import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../../../modules/authorization/actions";
import {useState} from "react";

export const HeaderMain = () => {
    const user = useSelector((state) => state['authorizationReducer'].authorization)
    const dispatch = useDispatch();
    const userLogOut = () => dispatch(logOut);
    const [userSearch, setUserSearch] = useState("")

    return (
        <div className="header__main">
            <div className={'header__logo'}>
                <p>Optimize yourself</p>
                <img src={"./images/logo.png"} alt="logo"/>
            </div>

            <div className="header__input">
                <input value={userSearch} type="text" onInput={e => setUserSearch(e.target.value)}
                       placeholder="Пошук користувача"/>
                <NavLink
                    className={'link'}
                    activeClassName={'link'}
                    exact to={`/profile/${userSearch}`}
                >
                    Знайти
                </NavLink>
            </div>

            <div className={"header__user-name"}>
                {user === 'Гість'
                    ? <p>{user}</p>
                    : <NavLink
                        className={'header__nav-elem'}
                        activeClassName={'header__nav-elem_active'}
                        exact to={`/profile/${user}`}
                    >{user}</NavLink>
                }
            </div>
            {user === 'Гість'
                ? <div className="header__log-in">
                    <NavLink
                        className={'header__nav-elem'}
                        activeClassName={'header__nav-elem_active'}
                        exact to={"/authorization"}
                    >
                        Вхід
                    </NavLink>
                </div>
                : <div className="header__log-out">
                    <button onClick={userLogOut}>Вихід</button>
                </div>
            }

        </div>
    )
}