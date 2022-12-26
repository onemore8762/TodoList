import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AppDispatch} from "../app/store";

export const handlerServerAppError = <D>(res: ResponseType<D>, dispatch : AppDispatch | any) => {
    if (res.messages.length){
        dispatch(setAppErrorAC({error: res.messages[0]}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handlerServerNetworkError = (error: { message: string}, dispatch : AppDispatch | any) => {
    dispatch(setAppErrorAC({error: error.message? error.message : 'Some error occured'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}