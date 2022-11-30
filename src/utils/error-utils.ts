import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AppDispatch} from "../app/store";

export const handlerServerAppError = <D>(res: ResponseType<D>, dispatch : AppDispatch) => {
    if (res.messages.length){
        dispatch(setAppErrorAC(res.messages[0]))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handlerServerNetworkError = (error: { message: string}, dispatch : AppDispatch) => {
    dispatch(setAppErrorAC(error.message? error.message : 'Some error occured'))
    dispatch(setAppStatusAC('failed'))
}