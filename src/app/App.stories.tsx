import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
  title: 'AppWithRedux Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => {
  return <App />

};

export const AppWithReduxBaseExample = Template.bind({});

AppWithReduxBaseExample.args = {
};

