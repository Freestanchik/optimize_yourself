import {
    GET_TODOS_ERROR,
    GET_TODOS_START,
    GET_TODOS_SUCCESS,
    ADD_TODO_SUCCESS,
    ADD_TODO_ERROR,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_ERROR,
    TOGGLE_TODO_ERROR,
    TOGGLE_TODO_SUCCESS,
    TOGGLE_TODO_START, EDIT_TODO_SUCCESS, EDIT_TODO_ERROR
} from "../actions";
import {EDIT_USER_START} from "../../user-profile/actions";

const initialState = {
    todos: [],
    error: {
        status: null
    }
}

export const todoReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_TODOS_SUCCESS:
        case ADD_TODO_SUCCESS:
        case DELETE_TODO_SUCCESS:
        case TOGGLE_TODO_SUCCESS:
        case EDIT_TODO_SUCCESS:
            return {error: null, todos: payload};

        case GET_TODOS_ERROR:
        case ADD_TODO_ERROR:
        case DELETE_TODO_ERROR:
        case TOGGLE_TODO_ERROR:
        case EDIT_TODO_ERROR:
            return {...state, error: payload};

        case GET_TODOS_START:
        case TOGGLE_TODO_START:
        case EDIT_USER_START:
        default:
            return state;
    }
}