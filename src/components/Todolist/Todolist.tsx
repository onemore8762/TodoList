import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import s from './Todolist.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
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
                                <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}
