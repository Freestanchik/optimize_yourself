
import axios from "axios";

export const AUTHORIZATION_START = "AUTHORIZATION_START"
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS"
export const AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR"
export const AUTHORIZATION_ERROR_DATA = "AUTHORIZATION_ERROR_DATA"

export const LOGOUT_START = "LOGOUT_START"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const authorize = (authorize) => (dispatch) => {
    const {password, email} = authorize;
    dispatch({type: AUTHORIZATION_START});
    axios
        .get(`https://optimize-yourself.herokuapp.com/check/authorised?email=${email}&password=${password}`)
        .then((response) => {
            if (response.data.authorised !== "false"){
                dispatch({
                    type: AUTHORIZATION_SUCCESS,
                    payload: response.data.authorised,
                })
            }else {
                dispatch({
                    type: AUTHORIZATION_ERROR_DATA,
                    payload: response.data.authorised,
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: AUTHORIZATION_ERROR,
                payload: error
            })
            console.log(error)
        });
}


export const logOut = (dispatch) => {
    dispatch({type: LOGOUT_START})
    dispatch({
        type: LOGOUT_SUCCESS,
        payload: "Гість",
    })
}
