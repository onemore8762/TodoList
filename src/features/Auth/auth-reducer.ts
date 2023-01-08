import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleAsyncServerAppError, handlerAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkError} from "../../app/store";


export const loginTC = createAsyncThunk< undefined, LoginParamsType, ThunkError>('auth/loginTC',
    async (params: LoginParamsType, thunkAPI) => {
        try {
            const data = await authAPI.login(params)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
        }
    })

export const logoutTC = createAsyncThunk('auth/logoutTC', async (arg, thunkAPI) => {
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (err) {
        return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
        });
    })
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// types
export type LoginActionsType = setIsLoggedInACType
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>