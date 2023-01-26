// stories/Grid.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tabs, tabsProps } from '../src/components/tabs';
import '../src/index.css';

const meta: Meta = {
  title: 'Tabs example',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
  },
};

const tabs = [
  { id: 1, name: 'Active activities' },
  { id: 2, name: 'Finished activities' },
];

export default meta;
const Template: Story<tabsProps> = (args) => <Tabs {...args} />;
export const Default = Template.bind({});

Default.args = {
  active: 1,
  tabs: tabs,
};
