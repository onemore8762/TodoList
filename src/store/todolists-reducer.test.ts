import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer, TodolistType
} from "./todolists-reducer";
import {FilterValuesType} from "../AppWithRedux";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    let newTodoList = 'New TodoList'

    const endState = todolistsReducer(startState, addTodolistAC(newTodoList))

    expect(endState[0].title).toBe(newTodoList)
    expect(endState.length).toBe(3)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newTodoListTitle = 'New TodoList'



    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should change its filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})