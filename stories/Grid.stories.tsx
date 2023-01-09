// stories/Grid.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Grid } from '../src/components/grid';
import { gridProps } from '../src/types';

const meta: Meta = {
  title: 'Grid example',
  component: Grid,
  parameters: {
    controls: { expanded: true },
  },
};

const columns = [
  { field: 'firstName', header: 'Firstname', width: '1' },
  { field: 'lastName', header: 'Lastname', width: '1' },
  { field: 'email', header: 'Email', width: '1' },
  { field: 'username', header: 'Username', width: '1' },
  { field: 'phoneNumber', header: 'Phone Number', width: '1' },
  { field: 'status', header: 'Status', width: '1' },
];

const data = [
  {
    id: '03788639-828c-4571-88df-e65773239ddc',
    username: 'josefine',
    firstName: 'josefine',
    lastName: 'Skov Pedersen',
    email: 'jsp@relateit.dk',
    phoneNumber: '0546626822',
    status: 'active',
  },
  {
    id: '5b3ecb2c-3e02-4d88-b3ed-5ab107e453f7',
    username: 'yazan',
    firstName: 'Yazan',
    lastName: 'Alkhatib',
    email: 'yaa@relateit.dk',
    phoneNumber: '0546626822',
    status: 'active',
  },
  {
    id: '5bffef1d-9856-4428-8682-1c5eab9f10b7',
    username: 'john3',
    firstName: 'john',
    lastName: 'doe',
    email: 'johndoe3@email.com',
    phoneNumber: '0522232452',
    status: 'active',
  },
  {
    id: '5bffef1d-9856-4428-8682-1c5eab9f10b7',
    username: 'john3',
    firstName: 'john',
    lastName: 'doe',
    email: 'johndoe3@email.com',
    phoneNumber: '0522232452',
    status: 'active',
  },
];

export default meta;
const Template: Story<gridProps> = args => {
  const [pageNumber, setPageNumber] = React.useState(1);
  return <Grid {...args} pageNumber={pageNumber} setPageNumber={setPageNumber} />;
};
export const Default = Template.bind({});

Default.args = {
  text: 'My Grid',
  columns: columns,
  resource: 'user',
  data: data,
  pageSize: 10,
};
