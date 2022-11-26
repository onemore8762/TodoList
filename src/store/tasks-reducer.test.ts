import React from 'react' // wait fix
/*
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer'
import {addTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


test('correct task should be deleted from correct array', () => {

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
            {id: '3', title: 'tea',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }


    expect(1).toEqual(1)
})

test('correct task should be added to correct array', () => {
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
            {id: '3', title: 'tea',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }

    const action = addTaskAC('todolistId2', 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(false)
})

test('status of specified task should be changed', () => {
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
            {id: '3', title: 'tea',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.Completed)

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)



})

test('title of specified task should be changed', () => {
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
            {id: '3', title: 'tea',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }

    const action = changeTaskTitleAC('todolistId2', '2', 'Milkyway')

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].title).toBe('Milkyway')



})

test('new array should be added when new todolist is added', () => {
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
            {id: '3', title: 'tea',description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})*/
