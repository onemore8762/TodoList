import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type ItemHelperType = {setError: (error: string) => void, setTitle: (title: string) => void}

export type AddItemFormType = {
    addItem: (title: string, helper: ItemHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) => {
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
    const addItemHandler =  () => {
        try{
            if (title.trim()) {
                addItem(title,{setTitle, setError})

            } else {
                setError('Field is required')
            }
        }catch (error: any){
            setError(error.message)
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
                <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled} style={{marginLeft: '10px'}}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </div>
    )
})