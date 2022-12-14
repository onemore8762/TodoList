import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handlerServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodoListTypeDomain[] = []

const slice = createSlice({
    name:'todolist',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{todolist: TodoListType}>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if(index !== -1){
                state.splice(index, 1)
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, title: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodoListType>}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
    }
})
export const todolistsReducer = slice.reducer
export const {addTodolistAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC} = slice.actions

// thunks
export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todoListsApi.getTodoLists()
        .then((response) => {
            console.log(response.data)
            dispatch(setTodolistsAC({todolists: response.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}
export const removeTodoListsTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todoListsApi.deleteTodoLists(todolistId)
        .then(() => {
            dispatch(removeTodolistAC({todolistId: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodoListsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todoListsApi.createTodoLists(title)
        .then((res) => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const changeTodoListsTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todoListsApi.updateTodoLists(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC({todolistId: id, title: title}))
        })
}

// types
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListTypeDomain = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType}
export type TodoListsActionsType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType
    | changeTodolistEntityStatusACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>