import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Login/login-reducer";

type PropsType = {
    demo?: boolean
}
export const App : React.FC<PropsType>= ({demo = false}) => {
    console.log('App is called')
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    },[dispatch])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if(!isInitialized){
        return  <div style={{position:'fixed',width:'100%', top:'30%', textAlign: 'center'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'} component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                 <Routes>
                     <Route path={'/login'} element={<Login/>} ></Route>
                     <Route path={'/'} element={<TodoListsList demo={demo}/>} ></Route>
                 </Routes>
            </Container>
        </div>
    );
}


