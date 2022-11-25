import {FilterValuesType} from "../../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState :  TodolistType[] = []
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType) : TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_FILTER:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

type ActionType = RemoveTodolistACType
    | AddTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
} // Удаление todoList

export const addTodolistAC = (title: string) => {
    return {type: ADD_TODOLIST, title, id: v1()} as const
} //  Добавление todoList

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, title , id: todolistId} as const
} // Изменение названия todoList

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: CHANGE_FILTER, filter , id: todolistId} as const
} // Изменение фильтрации todoList
