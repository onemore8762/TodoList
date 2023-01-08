import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import React, {useCallback, useEffect} from "react";
import {Grid} from "@mui/material";
import {AddItemForm, ItemHelperType} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {authSelectors} from "../Auth";
import {useActions} from "../../common/hooks/useActions";
import {todoListsActions} from "./index";
import {TodoListTypeDomain} from "./todolists-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";


type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodoListTypeDomain[]>(state => state.todoLists)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    const {fetchTodoLists, addTodoLists} = useActions(todoListsActions)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodoLists()
    }, [])

    const addTodoList = useCallback(async (title: string, helper: ItemHelperType) => {
        const thunk = todoListsActions.addTodoLists(title)
        const resultAction = await dispatch(thunk)

        if(todoListsActions.addTodoLists.rejected.match(resultAction)){
            if(resultAction.payload?.errors?.length){
                const errorMessage = resultAction.payload.errors[0]
                helper.setError(errorMessage)
            }
        }else{
            helper.setTitle("")
        }
        addTodoLists(title)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}></Navigate>
    }

    return (
        <>
            <Grid container style={{padding: '15px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={10} style={{flexWrap: 'nowrap', overflowX: 'scroll', minHeight: '50vh'}}>
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        return <Grid item key={tl.id}>
                            <div style={{width: '300px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    demo={demo}
                                />
                            </div>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}