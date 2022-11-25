import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistACType | AddTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export const todolistsReducer = (state: TodolistType[], action: ActionType) : TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
} // Удаление todoList

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
} //  Добавление todoList

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title , id: todolistId} as const
} // Изменение названия todoList

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', filter , id: todolistId} as const
} // Изменение фильтрации todoList
