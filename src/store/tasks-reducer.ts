
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {TaskType} from "../components/Todolist/Todolist";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState : TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.id]: state[action.id].filter(t => t.id !== action.taskId)}
        case ADD_TASK:
            return {...state, [action.id]: [{id: v1(), title: action.title, isDone: false}, ...state[action.id]]}
        case CHANGE_TASK_TITLE:
            return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case CHANGE_STATUS:
            return {...state, [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, isDone:  action.isDone} : t)}
        case ADD_TODOLIST:
            return {...state, [action.id]: []}
        case REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

type ActionType = RemoveTaskACType
    | AddTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | AddTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, id: todolistId, taskId} as const
} // Удаление task

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: ADD_TASK, title, id: todolistId} as const
} //  Добавление task

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, id: todolistId, taskId, title} as const
} // Изменение названия task

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: CHANGE_STATUS, id: todolistId, taskId, isDone} as const
} // Изменение фильтрации task

