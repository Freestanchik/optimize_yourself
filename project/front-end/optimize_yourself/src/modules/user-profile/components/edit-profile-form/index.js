import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {editUser} from "../../actions";
import "./edit-user-form.scss"

export const EditProfileForm = ({userData}) => {
    const dispatch = useDispatch();
    const {login, name, password, email} = userData;

    return (
        <Formik
            initialValues={
                {
                    name: name,
                    password: password,
                    email: email}
                }

            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Ім\'я є обов\'язковим'),
                email: Yup.string()
                    .email('Імейл введено невірно')
                    .required('Імейл є обов\'язковим'),
                password: Yup.string()
                    .min(9, 'Пароль повинен бути довшим за 8 символів')
                    .required('Пароль є обов\'язковим'),
            })}

            onSubmit={(values) => {
                dispatch(editUser(values, login))
            }}

        >

            <Form className={"edit-user-form"}>

                <h2>Редагування профілю</h2>

                <label htmlFor="name">Ім'я</label>
                <Field name="name" type="text"/>
                <ErrorMessage className={""} name="name">
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
            </Form>
        </Formik>
    );
};