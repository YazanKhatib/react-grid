import React from "react";
import { Grid } from "yaa-grid";
import { arabicProducts } from "./data";
import "yaa-grid/dist/style.css";

const columns = [
  { field: "id", header: "ID", width: "20" },
  { field: "brand", header: "Brand", width: "100" },
  { field: "category", header: "Category", width: "100" },
  { field: "description", header: "Description", width: "300" },
  { field: "price", header: "Price", width: "50" },
  { field: "rating", header: "Rating", width: "50" },
  { field: "title", header: "Phone number", width: "200" },
  // { field: "thumbnail", header: "Image", type: "img", width: "50" },
];

const arabicColumns = [
  { field: "id", header: "الرقم التعريفي", width: "50" },
  { field: "brand", header: "العلامة التجارية", width: "100" },
  { field: "category", header: "الفئة", width: "100" },
  { field: "description", header: "الوصف", width: "300" },
  { field: "price", header: "السعر", width: "50" },
  { field: "rating", header: "التقييم", width: "50" },
  { field: "title", header: "العنوان", width: "100" },
];

const App: React.FC = () => {
  const [rtl, setRtl] = React.useState(false);
  const [data, setData] =
    React.useState<{
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

  const onView = (e: any) => alert(`View ${JSON.stringify(e)}`);
  const onEdit = (e: any) => alert(`edit ${e}`);
  const onDelete = (e: any) => alert(`delete ${e}`);

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      <button
        style={{
          backgroundColor: "#406882",
          color: "white",
          padding: "4px 32px",
          borderRadius: "4px",
          margin: "12px",
        }}
        onClick={() => setRtl(!rtl)}
      >
        {rtl ? "LTR" : "RTL"}
      </button>

      {/* Backend pagination */}
      <div style={{ marginBottom: "100px" }}>
        <Grid
          rtl={rtl}
          // variant="stripe"
          search={false}
          jsonExport={false}
          data={rtl ? arabicProducts : data?.products}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          columns={rtl ? arabicColumns : columns}
          totalRecords={rtl ? undefined : data?.total}
          pageSize={10}
          onSelect={(ids: any) => alert(ids)}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>

      {/* Frontend pagination */}
      {/* <div style={{ marginBottom: "100px" }}>
        <Grid
          data={products.products}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          columns={columns}
          pageSize={10}
          onSelect={(ids: any) => alert(ids)}
          // totalRecords={30}
          pageNumber={pageNumber2}
          setPageNumber={setPageNumber2}
        />
      </div> */}
    </div>
  );
};

export default App;
