import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo ((props: AddItemFormType) => {
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
            addItem()
        }
    }
    const addItem = () => {
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
                <IconButton onClick={addItem} color={'primary'}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </div>
    )
})