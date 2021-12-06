import axios from "axios";

export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS"
export const GET_WEATHER_ERROR = "GET_WEATHER_ERROR"
export const GET_WEATHER_START = "GET_WEATHER_START"

export const fetchWeather = (lon, lat) => (dispatch) =>{
    dispatch({type: GET_WEATHER_START});
    axios
        .get(`https://optimize-yourself.herokuapp.com/get/weather?latitude=${lat}&longitude=${lon}`)
        .then((response) => {
            dispatch({
                type: GET_WEATHER_SUCCESS,
                payload: response.data.list,
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_WEATHER_ERROR,
                payload: error
            });
            console.log(error)
        });
}
