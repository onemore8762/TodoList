import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

export type AppRootState = ReturnType<typeof rootReducers>


//@ts-ignore
window.store = store