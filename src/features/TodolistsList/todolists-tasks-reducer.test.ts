import {tasksReducer, TasksStateType} from './tasks-reducer'
import {todolistsReducer, TodoListTypeDomain} from "./todolists-reducer";
import {todoListsActions} from "./";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";


const {addTodoLists, removeTodoLists} = todoListsActions

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListTypeDomain> = []

    const todoList = {
        id: 'wasdv2123',
        title: 'string',
        addedDate: 'string',
        order: 1,
    }
    const action = addTodoLists.fulfilled({todoList}, 'requestId', 'wasdv2123')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe('wasdv2123')
    expect(idFromTodolists).toBe('wasdv2123')
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'JS', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '3', title: 'React', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'milk', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '3', title: 'milk', description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
        ]
    }
    const todolistId = {todoListId: 'todolistId2'}
    const action = removeTodoLists.fulfilled(todolistId, 'requestId', 'todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
