import {
    addTodoListsTC,
    fetchTodoListsTC,
    removeTodoListsTC,
} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../../../api/todolists-api";
import {AppRootStateType} from "../../../../app/store";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const fetchTaskTC = createAsyncThunk('tasks/fetchTaskTC',
    async (todolistId: string, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            let response = await todoListsApi.getTasks(todolistId)

            dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todolistId: todolistId, tasks: response.data.items}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC',
    async (params: { todolistId: string, taskId: string }) => {

        await todoListsApi.deleteTasks(params.todolistId, params.taskId)

        return {todolistId: params.todolistId, taskId: params.taskId}
    }
)

export const addTaskTC = createAsyncThunk('tasks/addTaskTC',
    async (params: { todoListId: string, title: string }, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const response = await todoListsApi.createTask(params.todoListId, params.title)

            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: response.data.data.item}
            } else {
                handlerServerAppError(response.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC',
    async (params: { todoListId: string, taskId: string, model: UpdateDomainTaskModelType }, {
        dispatch,
        getState,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[params.todoListId].find(t => t.id === params.taskId)
        if (!task) {
            console.warn('task not found in the state')
            return rejectWithValue(null)
        }
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...params.model
        }

        try {
            const response = await todoListsApi.updateTask(params.todoListId,params.taskId, model)

            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todoListId: params.todoListId, taskId: params.taskId, model}
            } else {
                handlerServerAppError(response.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListsTC.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        });
        builder.addCase(removeTodoListsTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        })
    }
})

export const tasksReducer = slice.reducer


// thunks


// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}