import {
    GET_WEATHER_ERROR,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_START
} from "../actions";

const initialState = {
    weather: [],
    error: null
}

export const weatherReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_WEATHER_SUCCESS:
            return {...state, weather: payload};

        case GET_WEATHER_ERROR:
            return {...state, error: payload};

        case GET_WEATHER_START:
        default:
            return state;
    }
}