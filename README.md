# YAA Grid

YAA Grid control is a powerful and flexible tool for displaying and manipulating data. Specify your datasource and field names and you're ready to go.
The Grid also offers support for features such as sorting, filtering, paging, grouping, editing. These features allow you to easily manipulate and present large datasets in an efficient and user-friendly way.

## Setup

To install the Grid and its dependent packages, use the following command.

```bash
npm install yaa-grid # or yarn add
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

| Name            | Type                                               | Description          |
| --------------- | -------------------------------------------------- | -------------------- |
| `data`          | any                                                | Name of the resource |
| `columns`       | { field: string; header: string; width: number }[] | Path to the resource |
| `resource`      | string                                             | Path to the resource |
| `select`        | boolean                                            | Path to the resource |
| `loading`       | boolean                                            | Path to the resource |
| `pageNumber`    | number                                             | Path to the resource |
| `totalRecords`  | number                                             | Path to the resource |
| `onView`        | (id: string) => void                               | Path to the resource |
| `onEdit`        | (id: string) => void                               | Path to the resource |
| `onDelete`      | (id: string) => void                               | Path to the resource |
| `onSelect`      | (ids: string[]) => void                            | Path to the resource |
| `setPageNumber` | React.Dispatch<React.SetStateAction<number>>       | Path to the resource |
