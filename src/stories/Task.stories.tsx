import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task/Task";

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
  task: {id:'1', isDone: true, title: 'Task1'},
  todolistId: 'todolistId1',
  removeTask: action('removeTask'),
  changeTaskStatus: action('changeTaskStatus'),
  changeTaskTitle: action('changeTaskTitle'),
};


TaskFalse.args = {
  task: {id:'1', isDone: false, title: 'Task1'},
  todolistId: 'todolistId2',
  removeTask: action('removeTask'),
  changeTaskStatus: action('changeTaskStatus'),
  changeTaskTitle: action('changeTaskTitle'),
};
