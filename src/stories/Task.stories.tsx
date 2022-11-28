import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


export default {
    title: 'Task Component',
    component: Task,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => {
    return <>
        <Task {...args} />
    </>
};

export const TaskTrue = Template.bind({});
export const TaskFalse = Template.bind({});

TaskTrue.args = {
    task: {
        id: '1', title: 'Task1', description: '',

        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    todolistId: 'todolistId1',
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
};


TaskFalse.args = {
    task: {
        id: '1', title: 'Task1', description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    todolistId: 'todolistId2',
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
};
