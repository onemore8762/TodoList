import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";


export const App = () => {
    console.log('App is called')
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
                 <TodoListsList/>
            </Container>
        </div>
    );
}


