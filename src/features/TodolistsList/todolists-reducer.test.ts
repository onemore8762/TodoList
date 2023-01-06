import React from "react";
// import {v1} from "uuid";
// import {
//     addTodoLists,
//     changeTodolistEntityStatusAC,
//     changeTodolistFilterAC, changeTodoListsTitle, fetchTodoLists, FilterValuesType, removeTodoLists,
//     todolistsReducer, TodoListTypeDomain
// } from "./todolists-reducer";
// import {RequestStatusType} from "../../app/app-reducer";
//
// let todolistId1: string
// let todolistId2: string
// let startState: TodoListTypeDomain[]
//
// beforeEach(() => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     startState = [
//         {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
//     ]
// })
//
//
// test('correct todolist should be removed', () => {
//
//     const endState = todolistsReducer(startState, removeTodoLists.fulfilled({todoListId: todolistId1}, 'requestId', todolistId1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistId2)
// })
//
// test('correct todolist should be added', () => {
//     let newTodoList = 'New TodoList'
//
//     const todoList = {
//         id: 'as5d1sax34zc',
//         title: newTodoList,
//         addedDate: '24-09-16',
//         order: 1,
//     }
//     const endState = todolistsReducer(startState, addTodoLists.fulfilled({todoList}, 'requstId', todoList.title))
//
//     expect(endState[0].title).toBe(newTodoList)
//     expect(endState.length).toBe(3)
//     expect(endState[0].filter).toBe('all')
// })
//
// test('correct todolist should change its name', () => {
//
//     let newTodoListTitle = 'New TodoList'
//
//     const updateTodoList = {
//         todoListId: todolistId2,
//         title: newTodoListTitle
//     }
//     const endState = todolistsReducer(startState, changeTodoListsTitle.fulfilled(updateTodoList, 'requestId',
//         {todoListId: updateTodoList.todoListId, title: updateTodoList.title}))
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodoListTitle)
// })
//
// test('correct todolist should change its filter', () => {
//
//     let newFilter: FilterValuesType = 'completed'
//
//     const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId1, filter: newFilter}))
//
//     expect(endState[0].filter).toBe(newFilter)
//     expect(endState[1].filter).toBe('all')
// })
//
//
// test('todolists should be set to the state', () => {
//
//     const action = fetchTodoLists.fulfilled({todoLists: startState}, 'requestId')
//
//     const endState = todolistsReducer([], action)
//
//     expect(endState.length).toBe(2)
// })
//
// test('correct entity status of todolist should be changed', () => {
//
//     let newStatus: RequestStatusType = 'loading'
//
//     const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({status: newStatus, id: todolistId1}))
//
//     expect(endState[0].entityStatus).toBe(newStatus)
//     expect(endState[1].entityStatus).toBe('idle')
// })
