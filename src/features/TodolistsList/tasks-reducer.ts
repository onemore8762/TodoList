import {
  addTodolistAC,
  AddTodolistACType,
  removeTodolistAC,
  RemoveTodolistACType, setTodolistsAC,
  SetTodolistsACType
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todoListsApi,
  UpdateTaskModelType
} from "../../api/todolists-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers:{
    removeTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string}>){
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        tasks.splice(index,1)
    },
    addTaskAC(state, action: PayloadAction<{task: TaskType}>){
        state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(state, action: PayloadAction<{todolistId: string, taskId: string, model: UpdateDomainTaskModelType}>){
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks[index] = {...tasks[index], ...action.payload.model}
    },
    setTaskAC(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>){
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC,(state, action)=> {
        state[action.payload.todolist.id] = []
    });
    builder.addCase(removeTodolistAC,(state, action)=> {
        delete state[action.payload.todolistId]
    });
    builder.addCase(setTodolistsAC,(state, action)=> {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })

}
})
export const {removeTaskAC,
  addTaskAC,
  updateTaskAC,
  setTaskAC} = slice.actions
export const tasksReducer = slice.reducer


// thunks
export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.getTasks(todolistId)
        .then((response) => {
            dispatch(setTaskAC({todolistId: todolistId, tasks: response.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todoListsApi.deleteTasks(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC({todolistId: todolistId, taskId: taskId}))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsApi.createTask(todolistId, title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC({task: response.data.data.item}))
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