import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootState } from '../store/store'
import {tasksReducer} from '../store/tasks-reducer'
import {todolistsReducer} from '../store/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',  addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',  addedDate: '', order: 0}
    ],
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'HTML&CSS', isDone: true, description: '', completed: false,
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: v1(), title: 'JS', isDone: false,description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''}
        ],
        'todolistId2': [
            {id: v1(), title: 'Milk', isDone: false, description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''},
            {id: v1(), title: 'React Book', isDone: true, description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
