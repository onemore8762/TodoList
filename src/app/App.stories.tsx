import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "./App";
import {
  HashRouterProviderDecorator,
  ReduxStoreProviderDecorator
} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: 'AppWithRedux Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator, HashRouterProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => {
  return <App demo={true} />

};

export const AppWithReduxBaseExample = Template.bind({});

AppWithReduxBaseExample.args = {
};

