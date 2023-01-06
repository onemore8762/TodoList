import {asyncActions as taskAsyncActions} from "./tasks-reducer";
import {asyncActions as todoListAsyncActions} from "./todolists-reducer";
import {slice} from "./todolists-reducer";




const todoListsActions = {
    ...slice.actions,
    ...todoListAsyncActions
}

const tasksActions = {
    ...taskAsyncActions
}

export {
    todoListsActions,
    tasksActions
}