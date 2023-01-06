import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (title: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <TextField value={title}
                     size={'small'}
                     autoFocus={true}
                     onChange={onChangeHandler}
                     onBlur={activeViewMode}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>


})
