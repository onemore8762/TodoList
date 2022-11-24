import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Field is required')
        }
    }
    return (
        <div className={s.addItemForm}>
            <div className={s.inputWrapper}>
                <TextField value={title}
                           size={'small'}
                           variant={'outlined'}
                           label={'Type value'}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                           helperText={error}
                           error={!!error}/>
                <IconButton onClick={addTask} color={'primary'}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </div>
    )
}