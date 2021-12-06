import React, {useEffect, useState} from "react";
import {AddTodoForm} from "./components/add-todo-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "./actions";
import TodoItem from "./components/todo-item";
import Modal from "./components/modal";
import "./todo-list.scss"
import {fetchWeather} from "../weather-list/actions";

function TodosList() {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state['todoReducer'].todos)
    const error = useSelector(state => state['todoReducer'].error)
    const login = useSelector((state) => state['authorizationReducer'].authorization)
    const weather = useSelector((state) => state['weatherReducer'].weather)

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (login !== "Гість") {
            dispatch(fetchTodos(login))
        }
    }, [dispatch, login, weather.length]);

    useEffect(() => {
        if (weather.length === 0) {
            navigator.geolocation.getCurrentPosition(function (position) {
                dispatch(fetchWeather(position.coords.longitude, position.coords.latitude))
            });
        }
    }, [dispatch, weather.length]);


    return (
        <div className={'todos-list'}>
            <div className={"container_todo"}>
                {login !== "Гість"
                    ? <React.Fragment>
                        <button className={'todos-list__add-button'} onClick={() => setModalActive(true)}>Додати
                            справу
                        </button>
                        <Modal active={modalActive} setActive={setModalActive}>
                            <AddTodoForm login={login}/>
                        </Modal>
                        {!error
                            ? todos.map((todo) => (<TodoItem item={todo} key={todo.id}/>))
                            : <p>{error.message}</p>
                        }
                    </React.Fragment>
                    : <p>Будь ласка, авторизуйтеся для перегляду списку справ</p>
                }
            </div>
        </div>
    )
}

export default TodosList

