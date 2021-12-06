import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'
import {weatherReducer} from "../../modules/weather-list/reducers";
import {registerReducer} from "../../modules/registration/reducers";
import {authorizationReducer} from "../../modules/authorization/reducers";
import {searchUserReducer} from "../../modules/user-profile/reducers";
import {todoReducer} from "../../modules/todos-list/reducers";

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    weatherReducer,
    registerReducer,
    authorizationReducer,
    searchUserReducer,
    todoReducer,
});

