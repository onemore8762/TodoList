import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '32dd40b0-0151-4ced-8454-330669a6e58e'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

// api
export const todoListsApi = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
            .then(response => response.data)

    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
            .then(response => response.data)
    },
    deleteTodoLists(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
            .then(response => response.data)

    },
    updateTodoLists(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title: title})
            .then(response => response.data)
    },

    getTasks(todoListId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
            .then(response => response.data)
    },
    deleteTasks(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then(response => response.data)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: title})
            .then(response => response.data)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
            .then(response => response.data)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
            .then(response => response.data)
    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
            .then(response => response.data)
    }
}

// types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = { field: string, error: string };
export type ResponseType<D = {}> = {
    resultCode: number
    fieldsErrors?: Array<FieldErrorType>
    messages: Array<string>
    data: D
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
    status: TaskStatuses

}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

