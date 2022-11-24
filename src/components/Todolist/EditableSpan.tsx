import React, {ChangeEvent, useState} from "react";


type EditableSpan = {
    title: string
    onChange: (title: string) => void
}


export const EditableSpan = (props: EditableSpan) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () =>  {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <input value={title}
                 autoFocus={true}
                 onChange={onChangeHandler}
                 onBlur={activeViewMode}/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>


}
