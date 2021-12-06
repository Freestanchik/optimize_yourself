import {
    SEARCH_USER_SUCCESS,
    SEARCH_USER_START,
    SEARCH_USER_ERROR,
    EDIT_USER_START,
    EDIT_USER_SUCCESS, EDIT_USER_ERROR
} from "../actions";

const initialState = {
    userData: {
        todoElementsSet: []
    },
    error: null
}



export const searchUserReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case SEARCH_USER_ERROR:
        case EDIT_USER_ERROR:
            return {
                userData: [],
                error: payload
            };
        case SEARCH_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
            return {
                error: null,
                userData: payload
            };
        case SEARCH_USER_START:
        case EDIT_USER_START:
        default:
            return state;
    }
}