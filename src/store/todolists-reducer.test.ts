import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer, TodoListTypeDomain
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListTypeDomain[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListTypeDomain[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
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

    const startState: TodoListTypeDomain[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',  addedDate: '', order: 0}
    ]
    let newTodoListTitle = 'New TodoList'


    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should change its filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListTypeDomain[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',  addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',  addedDate: '', order: 0}
    ]
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})