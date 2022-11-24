import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";


function App() {

    let tasks1 = [
        {id: 1, title: 'Css', isDone: true},
        {id: 2, title: 'Html', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    let tasks2 = [
        {id: 1, title: 'Terminator', isDone: false},
        {id: 2, title: 'XXX', isDone: true},
        {id: 3, title: 'Jentlments of fortune', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'Movies'} tasks={tasks2}/>
        </div>
    );
}

export default App;
