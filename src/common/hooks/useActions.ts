import {useAppDispatch} from "./useAppDispatch";
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";


export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    },[])

    return boundActions
}