import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistType
} from "./store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";


export type FilterValuesType = 'all' | 'completed' | 'active'


export const AppWithRedux = () => {
    console.log('App is called')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todoLists)

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newValue))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newValue: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newValue))
    },[dispatch])

    return(
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
                <Grid container style={{padding:'15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            return <Grid item key={tl.id}>
                                <Paper style={{padding:'10px'}}>
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

