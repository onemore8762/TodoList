import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AppDispatch} from "../app/store";
import {AxiosError} from "axios";

export const handlerServerAppError = <D>(res: ResponseType<D>, dispatch : AppDispatch | any, showError = true) => {
    if(showError){
        if (res.messages.length){
            dispatch(setAppErrorAC({error: res.messages[0]}))
        }
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handlerServerNetworkError = (error: { message: string}, dispatch : AppDispatch | any, showError = true) => {
    if(showError){
        dispatch(setAppErrorAC({error: error.message? error.message : 'Some error occured'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

// export const handlerAsyncServerAppError = <D>(
//     res: ResponseType<D>,
//     dispatch : AppDispatch | any,
//     showError = true) => {
//     if(showError){
//         if (res.messages.length){
//             dispatch(setAppErrorAC({error: res.messages[0]}))
//         }
//     }
//     dispatch(setAppStatusAC({status: 'failed'}))
// }

export const handlerAsyncServerNetworkError = (
    error: AxiosError,
    thunkAPI: any,
    showError = true
) => {
    if(showError){
        thunkAPI.dispatch(setAppErrorAC({error: error.message? error.message : 'Some error occured'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}