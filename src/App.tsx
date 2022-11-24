import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";


export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},

        ]
    })


    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const addTodoList = (title: string) => {
        let newTodolistId = v1()
        setTodolists([...todolists, {id: newTodolistId, title: title, filter: 'all'}])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const changeTaskTitle = (taskId: string, todolistId: string, newValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newValue} : t)})
    }

    const changeTodolistTitle = (todolistId: string, newValue: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newValue} : tl))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

