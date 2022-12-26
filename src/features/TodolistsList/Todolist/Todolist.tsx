import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterValuesType, TodoListTypeDomain} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTaskTC} from "./Task/tasks-reducer";


type PropsType = {
    todolist: TodoListTypeDomain
    tasks: TaskType[]
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
    demo?: boolean
}


export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
        console.log('Todolist is called')
        const dispatch = useDispatch()

        useEffect(() => {
            if (demo) {
                return;
            }
            dispatch<any>(fetchTaskTC(props.todolist.id))
        }, [dispatch])

        const onAllClickHandler = useCallback(() =>
            props.changeFilter(props.todolist.id, 'all'), [props.changeFilter, props.todolist.id])
        const onActiveClickHandler = useCallback(() =>
            props.changeFilter(props.todolist.id, 'active'), [props.changeFilter, props.todolist.id])
        const onCompletedClickHandler = useCallback(() =>
            props.changeFilter(props.todolist.id, 'completed'), [props.changeFilter, props.todolist.id])

        const removeTodoList = useCallback(() => {
            props.removeTodoList(props.todolist.id)
        }, [props.removeTodoList, props.todolist.id])

        const changeTodolistTitle = useCallback((newTitle: string) => {
            props.changeTodolistTitle(props.todolist.id, newTitle)
        }, [props.changeTodolistTitle, props.todolist.id])

        const addTask = useCallback((title: string) => {
            props.addTask(props.todolist.id, title)
        }, [props.addTask, props.todolist.id])

        let tasksForTodolist = props.tasks

        if (props.todolist.filter === 'completed') {
            tasksForTodolist = props.tasks.filter(t => t.status)
        }
        if (props.todolist.filter === 'active') {
            tasksForTodolist = props.tasks.filter(t => !t.status)
        }
        return (
            <div>
                <h3>
                    <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                    <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
                <ul>
                    {
                        tasksForTodolist.map(t => {
                            return <Task key={t.id}
                                         task={t}
                                         todolistId={props.todolist.id}
                                         removeTask={props.removeTask}
                                         changeTaskStatus={props.changeTaskStatus}
                                         changeTaskTitle={props.changeTaskTitle}
                            />
                        })
                    }
                </ul>
                <div>
                    <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                            onClick={onAllClickHandler}
                            color={'inherit'}>All
                    </Button>
                    <Button variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                            color={'primary'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={'secondary'}
                            variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)

