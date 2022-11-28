import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'
const SET_TODOLISTS = 'SET_TODOLISTS'

const initialState: TodoListTypeDomain[] = []
export const todolistsReducer = (state: TodoListTypeDomain[] = initialState, action: TodoListsActionsType): TodoListTypeDomain[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case SET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


// actions
export const removeTodolistAC = (todolistId: string) => (
    {type: REMOVE_TODOLIST, id: todolistId} as const)
export const addTodolistAC = (todolist: TodoListType) => (
    {type: ADD_TODOLIST, todolist: todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => (
    {type: CHANGE_TODOLIST_TITLE, title: title, id: todolistId} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => (
    {type: CHANGE_FILTER, filter: filter, id: todolistId} as const)
export const setTodolistsAC = (todolists: Array<TodoListType>) => (
    {type: SET_TODOLISTS, todolists: todolists} as const)

// thunks
export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
    todoListsApi.getTodoLists()
        .then((response) => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const removeTodoListsTC = (todolistId: string): AppThunk => (dispatch) => {
    todoListsApi.deleteTodoLists(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodoListsTC = (title: string): AppThunk => (dispatch) => {
    todoListsApi.createTodoLists(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodoListsTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todoListsApi.updateTodoLists(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

// types
export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListTypeDomain = TodoListType & { filter: FilterValuesType }
export type TodoListsActionsType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>