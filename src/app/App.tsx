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
import {useAppSelector} from "../common/hooks/useAppSelector";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Auth/Login";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Auth/auth-reducer";
import {selectIsInitialized, selectStatus} from "./selectors";
import {authSelectors} from "../features/Auth";
import {useAppDispatch} from "../common/hooks/useAppDispatch";

type PropsType = {
    demo?: boolean
}
export const App : React.FC<PropsType>= ({demo = false}) => {

    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!demo && isInitialized){
            dispatch(initializeAppTC())
        }
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
        <div className="App" >
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
                     <Route path={'/'} element={<Navigate to={'todoList'}></Navigate>}></Route>
                     <Route path={'/todoList'} element={<TodoListsList demo={demo}/>} ></Route>
                     <Route path={'/login'} element={<Login/>} ></Route>

                 </Routes>
            </Container>
        </div>
    );
}


