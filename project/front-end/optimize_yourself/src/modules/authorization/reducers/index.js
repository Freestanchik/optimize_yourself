import {
    AUTHORIZATION_ERROR,
    AUTHORIZATION_START,
    AUTHORIZATION_SUCCESS,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    AUTHORIZATION_ERROR_DATA
} from "../actions";

const initialState = {
    authorization: 'Гість',
    errorData: null,
    error: null
}

export const authorizationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case AUTHORIZATION_ERROR:
            return {
                ...state,
                errorData: null,
                error: payload
            };
        case AUTHORIZATION_SUCCESS:
        case LOGOUT_SUCCESS:
            return {
                error: null,
                errorData: null,
                authorization: payload
            };
        case AUTHORIZATION_START:
        case LOGOUT_START:
        default:
            return state;
        case AUTHORIZATION_ERROR_DATA:
            return {
                ...state,
                error: null,
                errorData: payload
            }
    }
}