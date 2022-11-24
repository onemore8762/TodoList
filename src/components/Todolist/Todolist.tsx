import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import s from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    removeTodoList: (todolistId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
                <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, props.id, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, props.id, newValue)
                        }


                        return (
                            <li key={t.id} className={t.isDone ? s.isDone : ''}>
                                <input type="checkbox"
                                       onChange={onChangeStatusHandler}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? s.activeFilter : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
