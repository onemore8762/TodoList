import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

const ADD_TASK = 'ADD_TASK'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const UPDATE_TASK = 'UPDATE_TASK'
const SET_TODOLISTS = 'SET_TODOLISTS'
const SET_TASKS = 'SET_TASKS'
const REMOVE_TASK = 'REMOVE_TASK'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.id]: state[action.id].filter(t => t.id !== action.taskId)}
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.id]: state[action.id].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}
        case REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case SET_TODOLISTS:
            const copyState = {...state}

            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

type ActionType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | SetTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusACType = ReturnType<typeof updateTaskAC>
type SetTaskACType = ReturnType<typeof setTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, id: todolistId, taskId} as const
} // Удаление task

export const addTaskAC = (task: TaskType) => {
    return {type: ADD_TASK, task} as const
} //  Добавление task

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, id: todolistId, taskId, title} as const
} // Изменение названия task

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: UPDATE_TASK, id: todolistId, taskId, model} as const
} // Изменение фильтрации task

export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {type: SET_TASKS, tasks: tasks, todolistId: todolistId} as const
}

export const fetchTaskTC = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        todoListsApi.getTasks(todolistId)
            .then((response) => {
                dispatch(setTaskAC(response.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTasks(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTask(todolistId, title)
            .then((response) => {
                dispatch(addTaskAC(response.data.data.item))
                console.log(response.data.data.item)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            /*throw new Error("task not found in the state")*/
            console.warn('task not found in the state')
            return;
        }
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todoListsApi.updateTask(todoListId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(todoListId, taskId, model))
            })
    }
}