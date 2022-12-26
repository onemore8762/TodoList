import {combineReducers} from "redux";
import { tasksReducer} from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import {TodoListsActionsType, todolistsReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {LoginActionsType, authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducers = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducers,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

type AppStoreActionsType =  TodoListsActionsType | AppActionsType | LoginActionsType

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppStoreActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppStoreActionsType>

//@ts-ignore
window.store = store