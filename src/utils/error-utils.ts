import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AxiosError} from "axios";


// original type:
// BaseThunkAPI<S, E, D extends Dispatch = Dispatch, RejectedValue = undefined>
type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}


export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

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