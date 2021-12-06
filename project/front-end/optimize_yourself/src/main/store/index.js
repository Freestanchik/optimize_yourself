import {createBrowserHistory} from "history";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {routerMiddleware} from "connected-react-router";
import {createRootReducer} from "../rootReducer"


export const history = createBrowserHistory()
export const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ),
    ),
)