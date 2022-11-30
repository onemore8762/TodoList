import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    todolistsReducer, TodoListTypeDomain
} from "./todolists-reducer";
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodoListTypeDomain[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all',entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodoList = 'New TodoList'

    const endState = todolistsReducer(startState, addTodolistAC({
        id: 'as5d1sax34zc',
        title: newTodoList,
        addedDate: '24-09-16',
        order: 1,
    }))

    expect(endState[0].title).toBe(newTodoList)
    expect(endState.length).toBe(3)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let newTodoListTitle = 'New TodoList'


    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should change its filter', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, newFilter))

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})


test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {

    let newStatus:  RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId1, newStatus))

    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe('idle')
})
