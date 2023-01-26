import React from "react";
import { Grid } from "yaa-grid";
import "yaa-grid/dist/style.css";

const columns = [
  { field: "id", header: "ID", width: "1" },
  { field: "brand", header: "Brand", width: "1" },
  { field: "category", header: "Category", width: "1" },
  { field: "description", header: "Description", width: "1" },
  { field: "price", header: "Price", width: "1" },
  { field: "rating", header: "Rating", width: "1" },
  { field: "title", header: "Title", width: "1" },
];

const mock = [
  {
    id: "03788639-828c-4571-88df-e65773239ddc",
    username: "josefine",
    firstName: "josefine",
    lastName: "Skov Pedersen",
    email: "jsp@relateit.dk",
    phoneNumber: "0546626822",
    status: "active",
  },
  {
    id: "5b3ecb2c-3e02-4d88-b3ed-5ab107e453f7",
    username: "yazan",
    firstName: "yazan",
    lastName: "Alkhatib",
    email: "yaa@relateit.dk",
    phoneNumber: "0546626822",
    status: "active",
  },
  {
    id: "5bffef1d-9856-4428-8682-1c5eab9f10b7",
    username: "john",
    firstName: "john",
    lastName: "doe",
    email: "johndoe3@email.com",
    phoneNumber: "0522232452",
    status: "active",
  },
  {
    id: "5bffef1d-9856-4428-8682-1c5eab9f10b8",
    username: "samabbas",
    firstName: "Sam",
    lastName: "Abbas",
    email: "samabbas@email.com",
    phoneNumber: "0522232452",
    status: "active",
  },
];

const App: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch("https://dummyjson.com/products");

      const result = await data.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const onView = (e: string) => alert(`View ${e}`);
  const onEdit = () => alert("edit");
  const onDelete = () => alert("delete");

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      <Grid
        // @ts-ignore
        data={data.products}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        resource="user"
        loading={loading}
        columns={columns}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default App;
