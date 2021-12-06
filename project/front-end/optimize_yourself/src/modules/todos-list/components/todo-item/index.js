import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendDeleteTodo, sendToggleTodo} from "../../actions";
import Modal from "../modal";
import "./todo-item.scss"
import {EditTodoForm} from "../edit-todo-form";

const TodoItem = ({item}) => {
    const {id, body, todoType, timeStart, timeEnd, dateStart, dateEnd, completionCheck, weatherCheck} = item;

    const dispatch = useDispatch();
    const deleteTodo = () => dispatch(sendDeleteTodo(login, id));
    const handleChecked = () => dispatch(sendToggleTodo(login, item));

    const [modalActive, setModalActive] = useState(false);
    const [modal2Active, setModal2Active] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState("");


    const login = useSelector((state) => state['authorizationReducer'].authorization)
    const weather = useSelector((state) => state['weatherReducer'].weather)

    useEffect(() => {
        if (weatherCheck && weather && dateStart && dateEnd && timeStart && timeEnd) {
            let i;
            let info = []
            for (i = 0; i < weather.length; i++) {
                if (new Date(weather[i]["dt_txt"]) >= new Date(`${dateStart} ${timeStart}`)
                    && new Date(weather[i]["dt_txt"]) <= new Date(`${dateEnd} ${timeEnd}`)) {
                    if (weather[i].weather[0].description.includes("rain")) {
                        info.push("дощ")
                        break;
                    } else if (weather[i].main['temp'] <= 0) {
                        info.push("дуже холодно")
                    }
                }
            }
            if (info.length !== 0) {
                info.includes("дощ") ? setWeatherInfo("Справа під загрозою: дощ") : setWeatherInfo("Справа під загрозою: дуже холодно")
            } else {
                setWeatherInfo("")
            }
        } else {
            setWeatherInfo("")
        }
    }, [weatherCheck, weatherInfo, dateStart, dateEnd, timeStart, timeEnd, weather])

    return (
        <React.Fragment>
            <div className={'todo'}>
                <div className={"todo__check"}>
                    <input className={'todo-list__check'} type="checkbox" onChange={handleChecked}
                           checked={completionCheck}/>
                </div>
                <div className={"todo__info"}>
                    <p className={"weather-info_message"}>{weatherInfo}</p>
                    <p className={"todo__body"}>{body}</p>
                    {todoType
                        ? <p className={"todo__info-elem"}>Тип активності: {todoType}</p>
                        : <></>
                    }
                    <p className={"todo__info-elem"}>Дати
                        проведення: {dateStart ? dateStart : "не вказано"} - {dateEnd ? dateEnd : "не вказано"}</p>
                    <p className={"todo__info-elem"}>Час
                        проведення: {timeStart ? timeStart : "не вказано"} - {timeEnd ? timeEnd : "не вказано"}</p>
                    <p className={"todo__info-elem"}>{weatherCheck ? 'Справа залежить від погодних умов' : ''}</p>
                </div>
                <div className={"todo__buttons"}>
                    <button className={'edit-btn'} onClick={() => setModal2Active(true)}>&#9998;</button>
                    <button className={'delete-btn'} onClick={() => setModalActive(true)}>&#9746;</button>
                </div>
            </div>
            <Modal active={modal2Active} setActive={setModal2Active}>
                <EditTodoForm login={login} todoData={item}/>
            </Modal>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Ви впевнені, що хочите видалити справу?</p>
                <div className={"todo__delete-choice"}>
                    <button className={'yes-btn'} onClick={deleteTodo}>так</button>
                    <button className={'no-btn'} onClick={() => setModalActive(false)}>ні</button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default TodoItem;