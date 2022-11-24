import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";


export type FilterValuesType = 'all' | 'completed' | 'active'


export const App = () =>  {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'Css', isDone: true},
        {id: 2, title: 'Html', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeFilter = (value: FilterValuesType) =>{
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if(filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

