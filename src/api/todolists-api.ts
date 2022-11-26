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

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todoListsApi = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },
    deleteTodoLists(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoLists(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title: title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTasks(todoListId: string, taskId: string){
        return instance.get<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }
}
