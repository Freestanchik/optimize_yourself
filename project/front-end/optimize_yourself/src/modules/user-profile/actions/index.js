import axios from "axios";

export const SEARCH_USER_START = "SEARCH_USER_START"
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR"

export const searchUser = (login) => (dispatch) => {
    dispatch({type: SEARCH_USER_START});
    axios
        .get(`https://optimize-yourself.herokuapp.com/get/user-by-login?login=${login}`)
        .then((response) => {
            dispatch({
                type: SEARCH_USER_SUCCESS,
                payload: response.data,
            })
        })
        .catch((error) => {
            dispatch({
                type: SEARCH_USER_ERROR,
                payload: error
            })
        });
}

export const EDIT_USER_START = "EDIT_USER_START"
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS"
export const EDIT_USER_ERROR = "EDIT_USER_ERROR"

export const editUser = (item, login) => (dispatch) => {
    const {name, password, email} = item;
    dispatch({type: EDIT_USER_START});
    console.log(login)
    axios
        .patch(`https://optimize-yourself.herokuapp.com/patch/edit-user-by-login`, {
            name: name,
            login: login,
            email: email,
            password: password,
        })
        .then((response) => {
            dispatch({
                type: EDIT_USER_SUCCESS,
                payload: response.data,
            })
        })
        .catch((error) => {
            dispatch({
                type: EDIT_USER_ERROR,
                payload: error
            })
        });
}






