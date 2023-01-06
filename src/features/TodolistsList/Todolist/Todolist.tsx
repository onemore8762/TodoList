import React, {useCallback, useEffect} from "react";
import {AddItemForm, ItemHelperType} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton, Paper} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterValuesType, TodoListTypeDomain} from "../todolists-reducer";
import {TaskType} from "../../../api/todolists-api";
import {useActions} from "../../../common/hooks/useActions";
import {tasksActions, todoListsActions} from "../index";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";


type PropsType = {
    todolist: TodoListTypeDomain
    tasks: TaskType[]
    demo?: boolean
}


export const Todolist = React.memo(({demo = false, todolist, tasks}: PropsType) => {
        const {fetchTask} = useActions(tasksActions)
        const {
            removeTodoLists,
            changeTodoListsTitle,
            changeTodolistFilterAC,
        } = useActions(todoListsActions)

        const dispatch = useAppDispatch()

        useEffect(() => {
            if (demo) {
                return;
            }
            fetchTask(todolist.id)
        }, [])



        const removeTodoListCallBack = useCallback(() => {
            removeTodoLists(todolist.id)
        }, [todolist.id, removeTodoLists])

        const changeFilterCallBack = useCallback((todolistId: string, value: FilterValuesType) => {
            changeTodolistFilterAC({todolistId: todolistId, filter: value})
        }, [])

        const changeTodolistTitleCallBack = useCallback((todoListId: string, title: string) => {
            changeTodoListsTitle({todoListId, title})
        }, [])

        const changeTodolistTitle = useCallback((newTitle: string) => {
            changeTodolistTitleCallBack(todolist.id, newTitle)
        }, [todolist.id])

        const addTaskCallBack = useCallback( async (title: string, helper: ItemHelperType) => {
            const thunk = tasksActions.addTask({todoListId: todolist.id, title: title})
            const resultAction = await dispatch(thunk)

            if(tasksActions.addTask.rejected.match(resultAction)){
                if(resultAction.payload?.errors?.length){
                    const errorMessage = resultAction.payload.errors[0]
                    helper.setError(errorMessage)
                }
            }else{
                helper.setTitle("")
            }
        }, [todolist.id])

        const onAllClickHandler = useCallback(() =>
            changeFilterCallBack(todolist.id, 'all'), [todolist.id])
        const onActiveClickHandler = useCallback(() =>
            changeFilterCallBack(todolist.id, 'active'), [todolist.id])
        const onCompletedClickHandler = useCallback(() =>
            changeFilterCallBack(todolist.id, 'completed'), [todolist.id])

        let tasksForTodolist = tasks

        if (todolist.filter === 'completed') {
            tasksForTodolist = tasks.filter(t => t.status)
        }
        if (todolist.filter === 'active') {
            tasksForTodolist = tasks.filter(t => !t.status)
        }

        return (
            <Paper style={{position: 'relative', padding: '10px'}}>
                <IconButton onClick={removeTodoListCallBack} disabled={todolist.entityStatus === 'loading'}
                            style={{position: 'absolute', right: '5px'}}>
                    <Delete/>
                </IconButton>
                <h3>
                    <EditableSpan title={todolist.title} onChange={changeTodolistTitle}/>
                </h3>
                <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === 'loading'}/>
                <div>
                    {
                        tasksForTodolist.map(t => {
                            return <Task key={t.id}
                                         task={t}
                                         todolistId={todolist.id}

                            />
                        })
                    }
                    {!tasksForTodolist.length && <div style={{padding: '10px', color:'gray'}}>Create your first task </div>}
                </div>
                <div>
                    <Button variant={todolist.filter === 'all' ? 'contained' : 'text'}
                            onClick={onAllClickHandler}
                            color={'inherit'}>All
                    </Button>
                    <Button variant={todolist.filter === 'active' ? 'contained' : 'text'}
                            color={'primary'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={'secondary'}
                            variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </Paper>
        )
    }
)