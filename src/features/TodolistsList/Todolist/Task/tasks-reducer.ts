import {
    addTodolistAC,
    AddTodolistACType,
    removeTodolistAC,
    RemoveTodolistACType, setTodolistsAC,
    SetTodolistsACType
} from "../todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todoListsApi,
    UpdateTaskModelType
} from "../../../../api/todolists-api";
import {AppRootStateType, AppThunk} from "../../../../app/store";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: TasksStateType = {}

export const fetchTaskTC = createAsyncThunk('tasks/fetchTaskTC',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        let response = await todoListsApi.getTasks(todolistId)

        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

        return {todolistId: todolistId, tasks: response.data.items}
    }
)

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC',
    async (params: { todolistId: string, taskId: string }) => {

        await todoListsApi.deleteTasks(params.todolistId, params.taskId)

        return {todolistId: params.todolistId, taskId: params.taskId}
    }
)

export const addTaskTC = createAsyncThunk('tasks/addTaskTC',
    async (params: { todoListId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        try {
            const response = await todoListsApi.createTask(params.todoListId, params.title)

            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: response.data.data.item}
            } else {
                handlerServerAppError(response.data, thunkAPI.dispatch)
            }
        } catch (error) {
            debugger
            if (axios.isAxiosError(error)) {
                handlerServerNetworkError(error, thunkAPI.dispatch)
            }
        }
    }
)

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
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
    }
})
export const {
    updateTaskAC,
} = slice.actions
export const tasksReducer = slice.reducer


// thunks
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
                    dispatch(updateTaskAC({todolistId: todoListId, taskId: taskId, model: model}))
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
    | ChangeTaskStatusACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
type ChangeTaskStatusACType = ReturnType<typeof updateTaskAC>
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}