import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";

const APP_SET_STATUS = 'APP_SET_STATUS'
const APP_SET_ERROR = 'APP_SET_ERROR'
const APP_SET_IS_INITIALIZED = 'APP_SET_INITIALIZED'

const initialState: InitialStateAppType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateAppType = initialState, action: AppActionsType): InitialStateAppType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        case APP_SET_IS_INITIALIZED:
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// actions
export const setAppErrorAC = (error: string | null) => ({type: APP_SET_ERROR, error: error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status: status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: APP_SET_IS_INITIALIZED, value} as const)

// thunk
export const initializeAppTC =  () : AppThunk => (dispatch) => {
    authAPI.me()
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))

            } else{

            }
            dispatch(setAppInitializedAC(true))
    })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateAppType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, найстройки получили и т.д
    isInitialized: boolean
}
export type AppActionsType =
    | setErrorACType
    | setStatusACType
    | setAppInitializedACType
type setErrorACType = ReturnType<typeof setAppErrorAC>
type setStatusACType = ReturnType<typeof setAppStatusAC>
type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>

