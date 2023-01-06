import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkError} from "../../app/store";


export const loginTC = createAsyncThunk< undefined, LoginParamsType, ThunkError>('auth/loginTC',
    async (params: LoginParamsType, {dispatch, rejectWithValue}) => {
        try {
            const data = await authAPI.login(params)
            if (data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handlerServerAppError(data, dispatch)
                return rejectWithValue({
                    errors: data.messages,
                    fieldsErrors: data.fieldsErrors
                })
            }
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logoutTC = createAsyncThunk('auth/logoutTC', async (arg, thunkApi) => {
    try {
        const data = await authAPI.logout()
        if (data.resultCode === 0) {
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handlerServerAppError(data, thunkApi.dispatch)
            return thunkApi.rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handlerServerNetworkError(error, thunkApi.dispatch)
        return thunkApi.rejectWithValue(null)
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