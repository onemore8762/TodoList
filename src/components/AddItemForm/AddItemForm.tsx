import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo (({addItem,disabled = false}: AddItemFormType) => {
    console.log('AddItemForm is called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && console.log(error)
        error && setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title.trim())
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
                           error={!!error}
                           disabled={disabled}
                    />
                <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </div>
    )
})