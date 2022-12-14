import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";

const ADD_TASK = 'ADD_TASK'
const ADD_TODOLIST = 'ADD_TODOLIST'
const UPDATE_TASK = 'UPDATE_TASK'
const SET_TODOLISTS = 'SET_TODOLISTS'
const SET_TASKS = 'SET_TASKS'
const REMOVE_TASK = 'REMOVE_TASK'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case UPDATE_TASK:
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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

// actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: REMOVE_TASK, todolistId: todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: ADD_TASK, task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: UPDATE_TASK, todolistId: todolistId, taskId, model} as const)
export const setTaskAC = (tasks: TaskType[], todolistId: string) =>
    ({type: SET_TASKS, tasks: tasks, todolistId: todolistId} as const)

// thunks
export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.getTasks(todolistId)
        .then((response) => {
            dispatch(setTaskAC(response.data.items, todolistId))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todoListsApi.deleteTasks(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.createTask(todolistId, title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handlerServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handlerServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
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
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoListId, taskId, model))
                } else {
                    handlerServerAppError(response.data, dispatch)
                }

            })
            .catch((error) => {
                handlerServerNetworkError(error, dispatch)
            })
    }

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskActionsType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | SetTaskACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof updateTaskAC>
type SetTaskACType = ReturnType<typeof setTaskAC>
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}