import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListsTC,
    changeTodolistFilterAC,
    changeTodoListsTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListsTC,
    TodoListTypeDomain
} from "./store/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {TaskStatuses} from "./api/todolists-api";


export const AppWithRedux = () => {
    console.log('App is called')
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState, TodoListTypeDomain[]>(state => state.todoLists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch<any>(fetchTodoListsTC())
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch<any>(addTaskTC(todolistId, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch<any>(addTodoListsTC(title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch<any>(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch<any>(removeTodoListsTC(todolistId))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch<any>(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newValue: string) => {
        dispatch<any>(updateTaskTC(todolistId, taskId, {title: newValue}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        dispatch<any>(changeTodoListsTC(todolistId, newValue))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'} component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        removeTask={removeTask}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>

        </div>
    );
}

