import axios from "axios";

export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS"
export const GET_TODOS_ERROR = "GET_TODOS_ERROR"
export const GET_TODOS_START = "GET_TODOS_START"

export const ADD_TODO_START = "ADD_TODO_START";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR"

export const DELETE_TODO_START = "DELETE_TODO_START";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";


export const TOGGLE_TODO_START = "TOGGLE_TODO_START";
export const TOGGLE_TODO_ERROR = "TOGGLE_TODO_ERROR";
export const TOGGLE_TODO_SUCCESS = "TOGGLE_TODO_SUCCESS";

export const EDIT_TODO_START = "EDIT_TODO_START";
export const EDIT_TODO_ERROR = "EDIT_TODO_ERROR";
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";

export const fetchTodos = (login) => (dispatch) => {
    dispatch({type: GET_TODOS_START});
    axios
        .get(`https://optimize-yourself.herokuapp.com/get/all-ordered-todos-by-login?login=${login}`)
        .then((response) => {
            dispatch({
                type: GET_TODOS_SUCCESS,
                payload: response.data,
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_TODOS_ERROR,
                payload: error
            });
            console.log(error)
        });
}

export const sendAddTodo = (login, todo) => (dispatch) => {
    dispatch({type: ADD_TODO_START});
    const {body, todoType, weatherCheck, timeStart, timeEnd, dateStart, dateEnd} = todo;
    axios
        .post('https://optimize-yourself.herokuapp.com/post/add-todo', {
            login: login.login,
            body: body,
            todoType: todoType,
            weatherCheck: weatherCheck,
            timeStart: timeStart,
            timeEnd: timeEnd,
            dateStart: dateStart,
            dateEnd: dateEnd,
        })
        .then((response) => {
            dispatch(addTodo(response.data))
        })
        .catch((error) => {
            dispatch({
                type: ADD_TODO_ERROR,
                payload: error
            })
            console.log(error)
        })

}

export const sendEditTodo = (login, todo) => (dispatch) => {
    dispatch({type: EDIT_TODO_START});
    const {id, completionCheck, body, todoType, weatherCheck, timeStart, timeEnd, dateStart, dateEnd} = todo;
    axios
        .patch('https://optimize-yourself.herokuapp.com/patch/edit-todo-by-id', {
            id: id,
            login: login.login,
            body: body,
            todoType: todoType,
            weatherCheck: weatherCheck,
            timeStart: timeStart,
            timeEnd: timeEnd,
            dateStart: dateStart,
            dateEnd: dateEnd,
            completionCheck: completionCheck,
        })
        .then((response) => {
            dispatch(editTodo(todo))
        })
        .catch((error) => {
            dispatch({
                type: EDIT_TODO_ERROR,
                payload: error
            })
            console.log(error)
        })

}

export const editTodo = (response) => (dispatch, getState) => {
    const state = getState().todoReducer;
    const newTodos = state.todos.map(item => {
        if (item.id === response.id) {
            item = response
        }
        return item
    });

    dispatch({
        type: EDIT_TODO_SUCCESS,
        payload: newTodos
    });
}



export const addTodo = (response) => (dispatch, getState) => {
    const state = getState().todoReducer.todos;
    let index = -1;
    // eslint-disable-next-line array-callback-return
    state.map(item => {
        if (item.dateStart < response.dateStart) {
            index = state.indexOf(item)
        }
    });
    const newTodos = [...state]
    newTodos.splice(index + 1, 0, response)
    dispatch({
        type: ADD_TODO_SUCCESS,
        payload: newTodos
    });
}

export const sendDeleteTodo = (login, id) => (dispatch) => {
    dispatch({type: DELETE_TODO_START});
    axios
        .delete(`https://optimize-yourself.herokuapp.com/delete/todo?login=${login}&id=${id}`)
        .then((response) => {
            dispatch(deleteTodoById(id))
        })
        .catch((error) => {
            dispatch({
                type: DELETE_TODO_ERROR,
                payload: error
            })
            console.log(error)
        })
}

export const deleteTodoById = (id) => (dispatch, getState) => {
    const state = getState().todoReducer.todos;
    let index = -1;
    // eslint-disable-next-line array-callback-return
    state.map(item => {
        if (item.id === id) {
            index = state.indexOf(item)
        }
    });
    const newTodos = [...state];
    newTodos.splice(index, 1)
    dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: newTodos
    });
}

export const sendToggleTodo = (login, item) => (dispatch, getState) => {
    const {id, body, todoType, weatherCheck, timeStart, timeEnd, dateStart, dateEnd, completionCheck} = item;
    dispatch({type: TOGGLE_TODO_START});
    axios
        .patch('https://optimize-yourself.herokuapp.com/patch/edit-todo-by-id', {
            id: id,
            login: login.login,
            body: body,
            todoType: todoType,
            weatherCheck: weatherCheck,
            timeStart: timeStart,
            timeEnd: timeEnd,
            dateStart: dateStart,
            dateEnd: dateEnd,
            completionCheck: !completionCheck,
        })
        .then((response) => {
            dispatch(toggleTodo(id))
        })
        .catch((error) => {
            dispatch({
                type: TOGGLE_TODO_ERROR,
                payload: error
            })
            console.log(error)
        })
}

export const toggleTodo = (id) => (dispatch, getState) => {
    const state = getState().todoReducer;
    const newTodos = state.todos.map(item => {
        if (item.id === id) {
            item.completionCheck = !item.completionCheck
        }
        return item
    });

    dispatch({
        type: TOGGLE_TODO_SUCCESS,
        payload: newTodos
    });
}