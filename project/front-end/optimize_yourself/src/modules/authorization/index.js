import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import "./authorization.scss"
import {Link} from "react-router-dom";
import {authorize} from "./actions";

export const AuthorizationForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state['authorizationReducer'].error)
    const errorData = useSelector(state => state['authorizationReducer'].errorData)
    const authorization = useSelector(state => state['authorizationReducer'].authorization)

    return (
        <Formik
            initialValues={{email: '', password: ''}}

            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Імейл введено невірно')
                    .required('Імейл є обов\'язковим'),
                password: Yup.string()
                    .min(8, 'Пароль повинен бути довшим за 8 символів')
                    .required('Пароль є обов\'язковим'),

            })}
            onSubmit={(values, {resetForm}) => {
                dispatch(authorize(values))
                resetForm()
            }}
        >

            <Form className={"authorization-form"}>
                <div className={"container"}>
                    <h2>Авторизація користувача</h2>

                    {errorData
                        ? <p className={"authorization-form__error"}>Такого користувача не знайдено</p>
                        : <></>
                    }

                    {error
                        ? <p className={"authorization-form__error"}>Будь ласка, перевірте своє інтернет з'єднання</p>
                        : <></>
                    }

                    {authorization !== "Гість"
                        ? <p className={"authorization-form__success"}>Авторизація пройшла успішно!</p>
                        : <></>
                    }

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

                    <Link
                        className={'authorization__nav'}
                        to={"/registration"}
                    >
                        Зареєструватися
                    </Link>

                    <button type="submit" className={"submit"}>Submit</button>

                </div>
            </Form>
        </Formik>
    );
};