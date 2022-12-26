import {todoListsApi, TodoListType} from "../../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";
import {handlerServerNetworkError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoListsTC',
    async (arg, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const response = await todoListsApi.getTodoLists()

            dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todoLists: response.data}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const removeTodoListsTC = createAsyncThunk('todoLists/removeTodoListsTC',
    async (todoListId: string, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todoListId, status: 'loading'}))
        try {
            await todoListsApi.deleteTodoLists(todoListId)

            dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todoListId: todoListId}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const addTodoListsTC = createAsyncThunk('todoLists/addTodoListsTC',
    async (title: string, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const response = await todoListsApi.createTodoLists(title)

            dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todoList: response.data.data.item}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const changeTodoListsTitleTC = createAsyncThunk('todoLists/changeTodoListsTitleTC',
    async (params: {todoListId: string, title: string}, {dispatch,rejectWithValue}) => {
        try {
            await todoListsApi.updateTodoLists(params.todoListId, params.title)

            return {todoListId: params.todoListId, title: params.title}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodoListTypeDomain[],
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        });
        builder.addCase(removeTodoListsTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodoListsTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(changeTodoListsTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.title
        });
    }
})
export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
} = slice.actions

// types
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListTypeDomain = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type TodoListsActionsType =
    | ChangeTodolistFilterACType
    | changeTodolistEntityStatusACType
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>