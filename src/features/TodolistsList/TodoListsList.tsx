import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {
    addTodoListsTC,
    changeTodolistFilterAC,
    changeTodoListsTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListsTC,
    TodoListTypeDomain
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList : React.FC<PropsType> = ({demo = false}) => {
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodoListTypeDomain[]>(state => state.todoLists)
    const isLoggenIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if(demo || !isLoggenIn){
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodoListsTC(todolistId))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newValue: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newValue}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        dispatch(changeTodoListsTitleTC(todolistId, newValue))
    }, [dispatch])

    if(!isLoggenIn) {
        return <Navigate to={'/login'}></Navigate>
    }

    return (
        <>
            <Grid container style={{padding: '15px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={10}>
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    removeTask={removeTask}
                                    removeTodoList={removeTodoList}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}