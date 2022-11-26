import React, {useCallback} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";
import {FilterValuesType} from "../../store/todolists-reducer";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: PropsType) => {
        console.log('Todolist is called')
        const onAllClickHandler = useCallback(() =>
            props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
        const onActiveClickHandler = useCallback(() =>
            props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
        const onCompletedClickHandler = useCallback(() =>
            props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

        const removeTodoList = useCallback(() => {
            props.removeTodoList(props.id)
        }, [props.removeTodoList, props.id])

        const changeTodolistTitle = useCallback((newTitle: string) => {
            props.changeTodolistTitle(props.id, newTitle)
        }, [props.changeTodolistTitle, props.id])

        const addTask = useCallback((title: string) => {
            props.addTask(props.id, title)
        }, [props.addTask, props.id])

        let tasksForTodolist = props.tasks

        if (props.filter === 'completed') {
            tasksForTodolist = props.tasks.filter(t => t.isDone)
        }
        if (props.filter === 'active') {
            tasksForTodolist = props.tasks.filter(t => !t.isDone)
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
                        tasksForTodolist.map(t => {
                            return <Task key={t.id}
                                         task={t}
                                         todolistId={props.id}
                                         removeTask={props.removeTask}
                                         changeTaskStatus={props.changeTaskStatus}
                                         changeTaskTitle={props.changeTaskTitle}/>
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
)

