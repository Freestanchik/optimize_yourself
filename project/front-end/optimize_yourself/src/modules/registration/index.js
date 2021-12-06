import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import "./registration.scss"
import {register} from "./actions";

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state['registerReducer'].error)
    const registration = useSelector(state => state['registerReducer'].registration)

    return (
        <Formik
            initialValues={{name: '', login: '', password: '', email: ''}}

            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Ім\'я є обов\'язковим'),
                login: Yup.string()
                    .required('Логін є обов\'язковим'),
                email: Yup.string()
                    .email('Імейл введено невірно')
                    .required('Імейл є обов\'язковим'),
                password: Yup.string()
                    .min(9, 'Пароль повинен бути довшим за 8 символів')
                    .required('Пароль є обов\'язковим'),
            })}

            onSubmit={(values, {resetForm}) => {
                dispatch(register(values))
                resetForm()
            }}

        >

            <Form className={"registration-form"}>
                <div className="container">

                    <h2>Регістрація користувача</h2>
                    {error
                        ? error.message.includes('500')
                            ? <p className={"registration-form__error"}>Введений логін або імейл уже зареєстровано</p>
                            : <p className={"registration-form__error"}>будь ласка, перевірте інтернет з'єднання</p>
                        : <></>
                    }
                    {registration.length !==0
                        ?<p className={"registration-form__success"}>Регістрація пройшла успішно!</p>
                        :<></>
                    }

                    <label htmlFor="name">Ім'я</label>
                    <Field name="name" type="text"/>
                    <ErrorMessage className={""} name="name">
                        {msg => <div className={"error"}>{msg}</div>}
                    </ErrorMessage>

                    <label htmlFor="login">Логін</label>
                    <Field name="login" type="text"/>
                    <ErrorMessage className={""} name="login">
                        {msg => <div className={"error"}>{msg}</div>}
                    </ErrorMessage>

                    <label htmlFor="email">Імейл</label>
                    <Field name="email" type="text"/>
                    <ErrorMessage className={""} name="email">
                        {msg => <div className={"error"}>{msg}</div>}
                    </ErrorMessage>

                    <label htmlFor="password">Пароль</label>
                    <Field name="password" type="password"/>
                    <ErrorMessage className={""} name="password">
                        {msg => <div className={"error"}>{msg}</div>}
                    </ErrorMessage>

                    <button className={"submit"} type="submit">Submit</button>

                </div>
            </Form>
        </Formik>
    );
};