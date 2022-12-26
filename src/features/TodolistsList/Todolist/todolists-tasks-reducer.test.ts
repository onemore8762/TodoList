import { tasksReducer, TasksStateType} from './Task/tasks-reducer'
import {addTodolistAC, removeTodolistAC, todolistsReducer, TodoListTypeDomain} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListTypeDomain> = []

    const action = addTodolistAC({todolist: {
            id: 'wasdv2123',
            title: 'string',
            addedDate: 'string',
            order: 1,
        }})

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
            {id: '1', title: 'CSS',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'JS',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'React',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'milk',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'milk',description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
        ]
    }

    const action = removeTodolistAC({todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
