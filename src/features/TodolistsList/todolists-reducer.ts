import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleAsyncServerAppError, handlerAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkError} from "../../app/store";


export const slice = createSlice({
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
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
            .addCase(removeTodoLists.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodoLists.fulfilled, (state, action) => {
                state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodoListsTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListId)
                state[index].title = action.payload.title
            })
    }
})

//thunk

const fetchTodoLists = createAsyncThunk<{ todoLists: TodoListType[] }, undefined, ThunkError>('todoLists/fetchTodoListsTC',
    async (arg, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const data = await todoListsApi.getTodoLists()

            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todoLists: data}
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
        }
    }
)

const removeTodoLists = createAsyncThunk<{ todoListId: string }, string, ThunkError>('todoLists/removeTodoListsTC',
    async (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todoListId, status: 'loading'}))
        try {
            await todoListsApi.deleteTodoLists(todoListId)

            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todoListId: todoListId}
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
        }
    }
)

const addTodoLists = createAsyncThunk<{ todoList: TodoListType }, string, ThunkError>
('todoLists/addTodoListsTC',
    async (title, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const data = await todoListsApi.createTodoLists(title)

            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

                return {todoList: data.data.item}
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI.dispatch)
        }
    }
)

const changeTodoListsTitle = createAsyncThunk('todoLists/changeTodoListsTitleTC',
    async (params: { todoListId: string, title: string }, thunkAPI) => {
        try {

            const data = await todoListsApi.updateTodoLists(params.todoListId, params.title)
            if (data.resultCode === 0) {
                return {todoListId: params.todoListId, title: params.title}
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }

        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI.dispatch)
        }
    }
)

export const asyncActions = {
    fetchTodoLists,
    removeTodoLists,
    addTodoLists,
    changeTodoListsTitle
}

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