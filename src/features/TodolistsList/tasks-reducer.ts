import {asyncActions as todoListActions} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {AppRootStateType, ThunkError} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleAsyncServerAppError, handlerAsyncServerNetworkError} from "../../utils/error-utils";
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
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            let data = await todoListsApi.getTasks(todolistId)

            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

            return {todolistId: todolistId, tasks: data.items}
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
        }
    }
)

const removeTask = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkError>
('tasks/removeTaskTC', async (params: { todolistId: string, taskId: string }, thunkAPI) => {

        try {
            await todoListsApi.deleteTasks(params.todolistId, params.taskId)

            return {todolistId: params.todolistId, taskId: params.taskId}
        } catch (error) {
            return handlerAsyncServerNetworkError(error as AxiosError, thunkAPI)
        }
    }
)

const addTask = createAsyncThunk<{ task: TaskType }, { todoListId: string, title: string }, ThunkError>
('tasks/addTaskTC', async (params, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const data = await todoListsApi.createTask(params.todoListId, params.title)

            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: data.data.item}
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
        }
    }
)

const updateTask = createAsyncThunk('tasks/updateTaskTC',
    async (params: { todoListId: string, taskId: string, model: UpdateDomainTaskModelType }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType
        const task = state.tasks[params.todoListId].find(t => t.id === params.taskId)
        if (!task) {
            console.warn('task not found in the state')
            return thunkAPI.rejectWithValue(null)
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
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todoListId: params.todoListId, taskId: params.taskId, model}
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handlerAsyncServerNetworkError(err as AxiosError, thunkAPI)
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