import React from "react";
import { Grid } from "yaa-grid";
import "yaa-grid/dist/style.css";
import { products } from "./data";

const columns = [
  { field: "id", header: "ID", width: "1" },
  { field: "brand", header: "Brand", width: "1" },
  { field: "category", header: "Category", width: "1" },
  { field: "description", header: "Description", width: "2" },
  { field: "price", header: "Price", width: "1" },
  { field: "rating", header: "Rating", width: "1" },
  { field: "title", header: "Title", width: "1" },
];

const App: React.FC = () => {
  const [data, setData] = React.useState<{
    products: [];
    total: number;
    skip: number;
    limit: number;
  }>();
  const [loading, setLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageNumber2, setPageNumber2] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://dummyjson.com/products?skip=${(pageNumber - 1) * 10}&limit=10`
      );

      const result = await data.json();

      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [pageNumber]);

  const onView = (e: string) => alert(`View ${e}`);
  const onEdit = () => alert("edit");
  const onDelete = () => alert("delete");

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      {/* Backend pagination */}
      <div style={{ marginBottom: "100px" }}>
        <Grid
          data={data?.products}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          resource="user"
          loading={loading}
          columns={columns}
          totalRecords={data?.total}
          pageSize={10}
          onSelect={(ids: any) => alert(ids)}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>

      {/* Frontend pagination */}
      <div style={{ marginBottom: "100px" }}>
        <Grid
          data={products.products}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          resource="user"
          loading={loading}
          columns={columns}
          pageSize={10}
          // totalRecords={30}
          pageNumber={pageNumber2}
          setPageNumber={setPageNumber2}
        />
      </div>
    </div>
  );
};

export default App;
