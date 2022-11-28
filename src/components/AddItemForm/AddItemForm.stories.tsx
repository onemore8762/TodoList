import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => {
  return <>
    <AddItemForm {...args} />
  </>
};

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
  addItem: action('onChange'),
};
