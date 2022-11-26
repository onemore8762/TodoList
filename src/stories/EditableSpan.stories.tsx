import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";

export default {
  title: 'Editable Component',
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => {
  return <>
    <EditableSpan {...args} />
  </>
};

export const EditableSpanBaseExample = Template.bind({});

EditableSpanBaseExample.args = {
  title:'EditableSpan',
  onChange: action('value changed')
};

