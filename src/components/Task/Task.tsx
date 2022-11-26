import React, {ChangeEvent, useCallback} from "react";
import s from "../Todolist/Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.todolistId, props.task.id)

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked

        props.changeTaskStatus(props.todolistId, props.task.id,newIsDoneValue?TaskStatuses.Completed: TaskStatuses.New)
    },[props.changeTaskStatus, props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])


    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.isDone : ''}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
        </li>
    )
})