import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = createStore(rootReducers)

export type AppRootState = ReturnType<typeof rootReducers>


//@ts-ignore
window.store = store