import axios from "axios";

export const REGISTER_START = "REGISTER_START"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_ERROR = "REGISTER_ERROR"

export const register = (register) => (dispatch) => {
    const {name, login, password, email} = register;
    dispatch({type: REGISTER_START});
    axios
        .post('https://optimize-yourself.herokuapp.com/register', {
            name: name,
            login: login,
            password: password,
            email: email,
        })
        .then((response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: error
            })
            console.log(error)
        });
}

