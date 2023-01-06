import {asyncActions as todoListActions} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {AppRootStateType, ThunkError} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todoListActions.addTodoLists.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        });
        builder.addCase(todoListActions.removeTodoLists.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(todoListActions.fetchTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        })
    }
})


export const tasksReducer = slice.reducer

const fetchTask = createAsyncThunk('tasks/fetchTaskTC',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            let data = await todoListsApi.getTasks(todolistId)

            dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todolistId: todolistId, tasks: data.items}
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

const removeTask = createAsyncThunk('tasks/removeTaskTC',
    async (params: { todolistId: string, taskId: string }) => {

        await todoListsApi.deleteTasks(params.todolistId, params.taskId)

        return {todolistId: params.todolistId, taskId: params.taskId}
    }
)

const addTask = createAsyncThunk<{ task: TaskType }, { todoListId: string, title: string }, ThunkError>
('tasks/addTaskTC', async (params, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const data = await todoListsApi.createTask(params.todoListId, params.title)

            if (data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: data.data.item}
            } else {
                dispatch(setAppStatusAC({status: 'failed'}))
                return rejectWithValue({errors: data.messages, fieldsErrors: undefined})
            }
        } catch (err) {
            const error = err as AxiosError
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    }
)

const updateTask = createAsyncThunk('tasks/updateTaskTC',
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
            const data = await todoListsApi.updateTask(params.todoListId, params.taskId, model)

            if (data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todoListId: params.todoListId, taskId: params.taskId, model}
            } else {
                handlerServerAppError(data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            const error = err as AxiosError
            handlerServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const asyncActions = {
    fetchTask,
    removeTask,
    addTask,
    updateTask
}


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