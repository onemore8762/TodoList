import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handlerServerAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const loginTC = createAsyncThunk('login/loginTC',
    async (data: LoginParamsType, thunkAPI) => {
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {value: true}
        } else {
            handlerServerAppError(response.data, thunkAPI.dispatch)
        }
    }catch (error){
    }
})

export const logoutTC = createAsyncThunk('login/logoutTC', async (arg, thunkApi) => {
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {value: false}
        } else {
            handlerServerAppError(response.data, thunkApi.dispatch)
        }
    }catch (error){
        // handlerServerNetworkError(error, thunkApi.dispatch)
    }
})


const slice = createSlice({
  name:'auth',
  initialState: {
      isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
      state.isLoggedIn = action.payload.value
    }
  },
  extraReducers:(builder => {
      builder.addCase(loginTC.fulfilled, (state, action) => {
          if(action.payload){
              state.isLoggedIn = action.payload.value
          }
      });
      builder.addCase(logoutTC.fulfilled, (state, action) => {
          if(action.payload){
              state.isLoggedIn = action.payload.value
          }
      });
  })
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks



// types
export type LoginActionsType = setIsLoggedInACType
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>