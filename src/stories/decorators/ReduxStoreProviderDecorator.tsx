import React from 'react'
import { Provider } from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '../../app/store'
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../../features/TodolistsList/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState : AppRootStateType= {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'loading',  addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'idle' , addedDate: '', order: 0}
    ],
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'HTML&CSS', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: v1(), title: 'JS',description: '',

                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''}
        ],
        'todolistId2': [
            {id: v1(), title: 'Milk', description: '',

                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''},
            {id: v1(), title: 'React Book', description: '',

                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''}
        ]

    },
    app:{
        status:'idle',
        error: null,
        isInitialized: false
    },
    auth:{
        isLoggedIn: false
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
