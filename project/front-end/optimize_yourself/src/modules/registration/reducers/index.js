import {REGISTER_ERROR, REGISTER_START, REGISTER_SUCCESS} from "../actions";

const initialState = {
    registration: [],
    error: {
        status: null
    }
}



export const registerReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case REGISTER_ERROR:
            return {
                ...state,
                registration: [],
                error: payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registration: payload,
                error: null
            }
        case REGISTER_START:
        default:
            return {...state, error: null};
    }
}