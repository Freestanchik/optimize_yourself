import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {sendEditTodo} from "../../actions";
import {useDispatch} from "react-redux";
import {date} from "yup";
import "./edit-todo-form.scss"

export const EditTodoForm = ({login, todoData}) => {
    const {id, body, todoType, timeStart, timeEnd, dateStart, dateEnd, completionCheck, weatherCheck} = todoData;
    const dispatch = useDispatch();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today)

    return (
        <Formik
            initialValues={
                {
                    body: body,
                    todoType: todoType,
                    weatherCheck: weatherCheck,
                    timeStart: timeStart ? timeStart.substr(0, 5) : "",
                    timeEnd: timeEnd ? timeEnd.substr(0, 5) : "",
                    dateStart: dateStart ? dateStart : "",
                    dateEnd: dateEnd ? dateEnd : "",
                    completionCheck: completionCheck,
                    id: id
                }}
            validationSchema={Yup.object({
                body: Yup.string()
                    .max(80, 'Максимальний вміст тексту 80 символів')
                    .required('Текст справи обов\'язковий'),
                dateStart: date()
                    .min(today, "Дата повинна бути сьогоднішньою або більшою")
                    .required('Дата початку обов\'язкова'),
                dateEnd: date()
                    .min(Yup.ref('dateStart'), "Дата кінцю >= дата початку"),
                timeStart: Yup.string()
                    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "правильний формат(HH:MM)"),
                timeEnd: Yup.string()
                    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "правильний формат(HH:MM)"),
            })}

            onSubmit={(values) => {
                dispatch(sendEditTodo(login, values));
            }}
        >
            <Form className={"edit-todo-form"}>

                <h2>Редагування справи</h2>

                <label htmlFor="body">Body</label>
                <Field as="textarea" name="body" type="text"/>
                <ErrorMessage className={"add-post-form__error"} name="body">
                    {msg => <div className={"add-post-form__error"}>{msg}</div>}
                </ErrorMessage>

                <label htmlFor="todoType">Тип справи</label>
                <Field as="select" name="todoType">
                    <option value=""></option>
                    <option value="Спорт">Спорт</option>
                    <option value="Навчання">Навчання</option>
                    <option value="Робота">Робота</option>
                </Field>

                <div className={"weatherCheck__block"}>
                    <label htmlFor="weatherCheck">Перевірка погодних умов: </label>
                    <Field name="weatherCheck" type="checkbox"/>
                </div>

                <label htmlFor="dateStart">Дата початку справи</label>
                <Field name="dateStart" type="date"/>
                <ErrorMessage className={"add-post-form__error"} name="dateStart">
                    {msg => <div className={"add-post-form__error"}>{msg}</div>}
                </ErrorMessage>

                <label htmlFor="timeStart">Час початку справи</label>
                <Field name="timeStart" type="string"/>
                <ErrorMessage className={"add-post-form__error"} name="timeStart">
                    {msg => <div className={"add-post-form__error"}>{msg}</div>}
                </ErrorMessage>

                <label htmlFor="dateEnd">Дата кінця справи</label>
                <Field name="dateEnd" type="date"/>
                <ErrorMessage className={"add-post-form__error"} name="dateEnd">
                    {msg => <div className={"add-post-form__error"}>{msg}</div>}
                </ErrorMessage>

                <label htmlFor="timeEnd">Час кінця справи</label>
                <Field name="timeEnd" type="string"/>
                <ErrorMessage className={"add-post-form__error"} name="timeEnd">
                    {msg => <div className={"add-post-form__error"}>{msg}</div>}
                </ErrorMessage>

                <button type="submit">Редагувати</button>
            </Form>
        </Formik>
    );
};