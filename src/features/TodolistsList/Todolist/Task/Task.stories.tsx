import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
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
};
