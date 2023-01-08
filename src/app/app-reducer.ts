import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {handlerAsyncServerNetworkError} from "../utils/error-utils";

const slice = createSlice({
    name: 'app',
    initialState:{
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateAppType,
    reducers:{
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state)=> {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer


export const initializeAppTC = createAsyncThunk('app/initializeAppTC', async (arg, thunkAPI) => {
    try {
        const data = await authAPI.me()
        if(data.resultCode === 0){
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
        }
    }catch (err){
        return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
})


// actions
export const {setAppErrorAC, setAppStatusAC} = slice.actions


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

