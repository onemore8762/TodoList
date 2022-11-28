import {todoListsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";


const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_FILTER = 'CHANGE_FILTER'
const SET_TODOLISTS = 'SET_TODOLISTS'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListTypeDomain = TodoListType & {
    filter: FilterValuesType
}

const initialState: TodoListTypeDomain[] = []
export const todolistsReducer = (state: TodoListTypeDomain[] = initialState, action: ActionType): TodoListTypeDomain[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            let newTodoList: TodoListTypeDomain = {...action.todolist, filter: 'all'}
            return [newTodoList, ...state]
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

type ActionType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, id: todolistId} as const
} // Удаление todoList

export const addTodolistAC = (todolist: TodoListType) => {
    return {type: ADD_TODOLIST, todolist: todolist} as const
} //  Добавление todoList

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, title: title, id: todolistId} as const
} // Изменение названия todoList

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: CHANGE_FILTER, filter: filter, id: todolistId} as const
} // Изменение фильтрации todoList

export const setTodolistsAC = (todolists: Array<TodoListType>) => {
    return {type: SET_TODOLISTS, todolists: todolists} as const
} // Изменение фильтрации todoList


export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListsApi.getTodoLists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
            })
    }
}

export const removeTodoListsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTodoLists(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodoListsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTodoLists(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodoListsTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.updateTodoLists(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}
