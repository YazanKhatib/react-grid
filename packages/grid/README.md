# YAA Grid

YAA Grid control is a powerful and flexible tool for displaying and manipulating data. Specify your datasource and field names and you're ready to go.
The Grid also offers support for features such as sorting, filtering, paging. These features allow you to easily manipulate and present large datasets in an efficient and user-friendly way.

PS this package is under development, please contact me for additional features

![Screenshot](https://raw.githubusercontent.com/YazanKhatib/react-grid/development/packages/grid/Screenshot.png)

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

import 'yaa-grid/dist/style.css';

const App: React.FC = () => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(`https://dummyjson.com/products?skip=${(pageNumber - 1) * 10}&limit=10`);

      const result = await data.json();

      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [pageNumber]);

  /*
   * Column width can be either 1 or 2
   */
  const columns = [
    { field: 'id', header: 'ID', width: '1' },
    { field: 'brand', header: 'Brand', width: '1' },
    { field: 'category', header: 'Category', width: '1' },
    { field: 'description', header: 'Description', width: '2' },
    { field: 'price', header: 'Price', width: '1' },
    { field: 'rating', header: 'Rating', width: '1' },
    { field: 'title', header: 'Title', width: '1' },
  ];

  const onView = (e: string) => alert(`View ${e}`);
  const onEdit = () => alert('edit');
  const onDelete = () => alert('delete');

  return (
    <Grid
      data={data?.products}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      loading={loading}
      columns={columns}
      pageSize={10}
      totalRecords={data?.total}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
    />
  );
};
```

## Props

| Name            | Type                                               | Description                                                     |
| --------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| `data`          | any                                                | Data source                                                     |
| `columns`       | { field: string; header: string; width: string }[] | Columns shape                                                   |
| `loading`       | boolean                                            | defaultValue: false                                             |
| `pageNumber`    | number                                             | DefaultValue: 1                                                 |
| `totalRecords`  | number                                             | Used only with frontend pagination. DefaultValue: data.length() |
| `onView`        | (id: string) => void                               |                                                                 |
| `onEdit`        | (id: string) => void                               |                                                                 |
| `onDelete`      | (id: string) => void                               |                                                                 |
| `onSelect`      | (ids: string[]) => void                            | Perform action on selected records                              |
| `setPageNumber` | React.Dispatch<React.SetStateAction<number>>       | Pagination                                                      |

## Contact

Please contact me for adding more features or package ideas

<a href="https://www.buymeacoffee.com/yazankhatib" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
