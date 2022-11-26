import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = () => {
  return <AppWithRedux />

};

export const AppWithReduxBaseExample = Template.bind({});

AppWithReduxBaseExample.args = {
};

