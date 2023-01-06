import React, {ChangeEvent, useCallback} from "react";
import s from "../Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {useActions} from "../../../../common/hooks/useActions";
import {tasksActions} from "../../index";


type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const {updateTask, removeTask} = useActions(tasksActions)

    const onRemoveHandler = () => removeTask({todolistId: props.todolistId, taskId: props.task.id})

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({
            todoListId: props.todolistId,
            taskId: props.task.id,
            model: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        updateTask({todoListId: props.todolistId, taskId: props.task.id, model: {title: newValue}})
    }, [props.todolistId, props.task.id])


    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? s.isDone : ''}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler} style={{position: 'absolute', right: '25px'}}><Delete/></IconButton>
        </li>
    )
})