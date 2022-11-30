import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TaskActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {TodoListsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {LoginActionsType, authReducer} from "../features/Login/login-reducer";


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))


type AppStoreActionsType = TaskActionsType | TodoListsActionsType | AppActionsType | LoginActionsType

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppStoreActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppStoreActionsType>

//@ts-ignore
window.store = store