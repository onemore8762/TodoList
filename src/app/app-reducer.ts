import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateAppType = {
    status: 'idle',
    error: null,
    isInitialized: false
}



const slice = createSlice({
    name: 'app',
    initialState:initialState,
    reducers:{
        setAppInitializedAC(state, action: PayloadAction<{value: boolean}>){
            state.isInitialized = action.payload.value
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
    }
})

export const appReducer = slice.reducer

// actions
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions


// thunk
export const initializeAppTC =  () : AppThunk => (dispatch) => {
    authAPI.me()
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedInAC({value: true}))

            } else{

            }
            dispatch(setAppInitializedAC({value: true}))
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
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>

