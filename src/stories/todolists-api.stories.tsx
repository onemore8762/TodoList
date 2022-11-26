import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todolists-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.getTodoLists()
            .then((response) => {
                setState(response.data[0])
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.createTodoLists('Sex')
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let name = '677818cc-0e99-4856-bb9e-9ba4a20ec533'
        todoListsApi.deleteTodoLists(name)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = '64539fd3-11e7-4ddb-8103-ee368492e598'
        todoListsApi.updateTodoLists(id, 'Bread')
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'fe9929ea-c476-4367-8d52-40441183233e'
        todoListsApi.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'fe9929ea-c476-4367-8d52-40441183233e'
        let taskId = ''
        todoListsApi.deleteTasks(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//создание таски
//обновление таски