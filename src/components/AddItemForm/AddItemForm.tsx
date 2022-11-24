import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css'

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
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? s.error : ''}/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={s.errorMessage}>Field is required</div>}
        </div>
    )
}