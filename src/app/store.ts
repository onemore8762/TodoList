import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TaskActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodoListsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))


type AppActionsType = TaskActionsType | TodoListsActionsType

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store