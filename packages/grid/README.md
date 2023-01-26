# YAA Grid

YAA Grid control is a powerful and flexible tool for displaying and manipulating data. Specify your datasource and field names and you're ready to go.
The Grid also offers support for features such as sorting, filtering, paging, grouping, editing. These features allow you to easily manipulate and present large datasets in an efficient and user-friendly way.

## Setup

To install the Grid and its dependent packages, use the following command.

```bash
npm install yaa-grid # or yarn add

import "yaa-grid/dist/style.css";
```

## Using the library

Now it’s time to cover use cases. Starting from its basic form.

```js
import { Grid } from 'yaa-grid';

const columns = [
  { field: 'firstName', header: 'Firstname', width: '1' },
  { field: 'lastName', header: 'Lastname', width: '1' },
  { field: 'email', header: 'Email', width: '1' },
  { field: 'username', header: 'Username', width: '1' },
  { field: 'phoneNumber', header: 'Phone Number', width: '1' },
  { field: 'status', header: 'Status', width: '1' },
];

<Grid
  resource="user"
  columns={columns}
  data={data}
  loading={isLoading}
  pageNumber={pageNumber}
  setPageNumber={setPageNumber}
/>;
```

## Props

| Name            | Type                                               | Description                           |
| --------------- | -------------------------------------------------- | ------------------------------------- |
| `data`          | any                                                | Data source                           |
| `columns`       | { field: string; header: string; width: number }[] | Data shape                            |
| `resource`      | string                                             |                                       |
| `select`        | boolean                                            | Enable to select records              |
| `loading`       | boolean                                            | Enable to display a loading indicator |
| `pageNumber`    | number                                             | Defaults to 1                         |
| `totalRecords`  | number                                             | Defaults to array size                |
| `onView`        | (id: string) => void                               |                                       |
| `onEdit`        | (id: string) => void                               |                                       |
| `onDelete`      | (id: string) => void                               |                                       |
| `onSelect`      | (ids: string[]) => void                            | Perform action on selected records    |
| `setPageNumber` | React.Dispatch<React.SetStateAction<number>>       | Pagination                            |
