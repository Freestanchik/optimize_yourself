import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchUser} from "./actions";
import {useRouteMatch} from "react-router";
import "./user.scss"
import Modal from "../todos-list/components/modal";
import {EditProfileForm} from "./components/edit-profile-form";

function UserProfile() {
    const userData = useSelector((state) => state['searchUserReducer'].userData)
    const currentUser = useSelector((state) => state['authorizationReducer'].authorization)
    const error = useSelector(state => state['searchUserReducer'].error)
    const dispatch = useDispatch();
    let {url} = useRouteMatch();
    useEffect(() => {
        dispatch(searchUser(url.substring(9, url.length)))
    }, [dispatch, url]);

    const [modalActive, setModalActive] = useState(false);

    let todosDone = 0;

    if (!error) {
        userData.todoElementsSet.map((item) => (item.completionCheck ? todosDone++ : ""))
    }

    return (
        <React.Fragment>
            <div className={'profile'}>
                <div className="container">
                    {!error
                        ? <React.Fragment>
                            <h2>Профіль користувача {userData.login}</h2>
                            {userData.login === currentUser
                                ? <button className={'edit-btn'} onClick={() => setModalActive(true)}>&#9998;</button>
                                : <></>
                            }
                            <p>Ім'я користувача: {userData.name}</p>

                            <p>Імейл користувача: {userData.email}</p>
                            <p>Всього справ: {userData.todoElementsSet.length}</p>
                            <p>Виконано справ: {todosDone}</p>
                            <p>Рівень виконуваності справ: {todosDone / userData.todoElementsSet.length}</p>
                        </React.Fragment>
                        : <p className={"profile__error"}>Такого користувача не знайдено</p>
                    }
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalActive
                    ? <EditProfileForm userData={userData}/>
                    : <></>
                }
            </Modal>
        </React.Fragment>

    )

}

export default UserProfile