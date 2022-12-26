import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const loginTC = createAsyncThunk< undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/loginTC',
    async (data: LoginParamsType, {dispatch, rejectWithValue}) => {
        try {
            const response = await authAPI.login(data)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handlerServerAppError(response.data, dispatch)
                return rejectWithValue({
                    errors: response.data.messages,
                    fieldsErrors: response.data.fieldsErrors
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
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handlerServerAppError(response.data, thunkApi.dispatch)
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
        builder.addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = false
        });
    })
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// types
export type LoginActionsType = setIsLoggedInACType
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>