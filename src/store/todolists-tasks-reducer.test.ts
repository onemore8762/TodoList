import React from 'react'
/*
import {tasksReducer, TasksStateType} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, todolistsReducer, TodoListTypeDomain} from "./todolists-reducer";

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

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListTypeDomain> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'JS',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'React',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'milk',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'milk',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})*/ //wait fix
