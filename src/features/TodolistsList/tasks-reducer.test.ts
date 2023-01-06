import React from "react";
// import {TaskPriorities, TaskStatuses, UpdateTaskModelType} from '../../api/todolists-api';
//
// import {addTask, fetchTask, tasksReducer, TasksStateType, updateTask} from './tasks-reducer'
// import {addTodoLists, fetchTodoLists} from "./todolists-reducer";
//
// let startState: TasksStateType;
//
// beforeEach(() => {
//     startState = {
//         'todolistId1': [
//             {
//                 id: '1', title: 'CSS', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             },
//             {
//                 id: '2', title: 'JS', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             },
//             {
//                 id: '3', title: 'React', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             }
//         ],
//         'todolistId2': [
//             {
//                 id: '1', title: 'bread', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             },
//             {
//                 id: '2', title: 'milk', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             },
//             {
//                 id: '3', title: 'tea', description: '',
//                 status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             }
//         ]
//     }
//
// })
//
//
// test('correct task should be deleted from correct array', () => {
//
//     const todoList = {
//         id: 'string',
//         title: 'string',
//         addedDate: 'string',
//         order: 1,
//     }
//
//     const action = addTodoLists.fulfilled({todoList}, 'requestId', todoList.title)
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
//
//
// })
//
//
// test('correct task should be added to correct array', () => {
//     const newTask = {
//         task: {
//             todoListId: 'todolistId2',
//             title: 'juce',
//             status: TaskStatuses.New,
//             addedDate: '',
//             deadline: '',
//             description: '',
//             order: 0,
//             priority: 0,
//             startDate: '',
//             id: "dsadsada"
//         }
//     }
//     const action = addTask.fulfilled(newTask, '', {todoListId: 'todolistId2', title: 'juce'})
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
// })
//
// test('status of specified task should be changed', () => {
//     const updateModel = {todoListId: 'todolistId2', taskId: '2', model: {status: TaskStatuses.Completed} as UpdateTaskModelType}
//
//     const action = updateTask.fulfilled(updateModel, 'requestId', updateModel)
//
//     const endState = tasksReducer(startState, action)
//     expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
//
//
// })
//
// test('title of specified task should be changed', () => {
//
//     let updateModel = {todoListId: 'todolistId2', taskId: '2', model: {title: 'Milkyway'} as UpdateTaskModelType}
//
//     const action = updateTask.fulfilled(updateModel, 'requestId', updateModel)
//
//     const endState = tasksReducer(startState, action)
//     expect(endState['todolistId2'][1].title).toBe('Milkyway')
//
//
// })
//
// test('new array should be added when new todolist is added', () => {
//     const todoList = {
//         id: 'string',
//         title: 'string',
//         addedDate: 'string',
//         order: 1,
//     }
//     const action = addTodoLists.fulfilled({todoList}, 'requestId', todoList.title)
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
//
// test('empty arrays should be added when we set todolists', () => {
//
//     const action = fetchTodoLists.fulfilled({
//         todoLists: [
//             {id: "1", title: "title 1", order: 0, addedDate: ""},
//             {id: "2", title: "title 2", order: 0, addedDate: ""}
//         ]
//     }, 'requestId')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(4)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
// })
//
// test('tasks should be added for todolist', () => {
//
//     const action = fetchTask.fulfilled({
//         todolistId: 'todolistId1',
//         tasks: startState['todolistId1']
//     }, '', 'todolistId1')
//     const endState = tasksReducer({
//         "todolistId2": [],
//         "todolistId1": []
//     }, action)
//
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(0)
//
// })
//
