import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import exportFromJSON from 'export-from-json';
import { gridProps } from '../types';
import { Trash, Pencil, Download, Eye, Search, ArrowUp, ArrowDown } from '../icons';
import PaginationComponent from './pagination';
import '../index.css';

export const Grid: React.FC<gridProps> = ({
  data,
  height,
  columns,
  loading = false,
  pageSize = 10,
  pageNumber = 1,
  totalRecords,
  rtl = false,
  onView,
  onEdit,
  onDelete,
  onSelect,
  setPageNumber,
}) => {
  // Temporarily store the search results
  const [renderedData, setRenderedData] = React.useState(data);
  const [checked, setChecked] = React.useState<number[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [selected, setSelected] = React.useState<number[]>([]);

  /*
   * state for sorting data by a specific column
   * 0: original order
   * 1: alphabatical order
   * 2: reverse alphabatical order
   */
  const [sorted, setSorted] = React.useState({
    column: '',
    status: 0,
  });
  const fileName = 'download';
  const exportType = exportFromJSON.types?.csv;

  const onRowSelection = (value: any, id: number) => {
    value ? setSelected([...selected, id]) : setSelected(selected.filter((v) => v !== id));
  };

  React.useEffect(() => {
    setRenderedData(data);
  }, [data]);

  /*
   * Pagination logic
   */
  const paginate = (action: string) => {
    /*
     * Backend pagination (totalRecords, pageSize and PageNumber)
     * Data is recieved from the backend
     *
     * Frontend pagination (pageSize, pageNumber)
     */

    totalRecords = totalRecords === undefined ? data?.length : totalRecords;

    switch (action) {
      case 'first':
        return setPageNumber!(1);
      case 'next':
        return pageNumber! + 1 <= Math.ceil(totalRecords! / pageSize) && setPageNumber!(pageNumber! + 1);
      case 'previous':
        return pageNumber! > 1 && setPageNumber!(pageNumber! - 1);
      case 'last':
        return totalRecords! > pageSize && setPageNumber!(Math.ceil(totalRecords! / pageSize));
    }
  };

  /*
   * Sorting the data
   */
  React.useEffect(() => {
    if (sorted.status) {
      let condition = false;
      let reversedCondition = false;

      const result = [...data].sort((a: any, b: any) => {
        condition = sorted.status === 1 ? a[sorted.column] > b[sorted.column] : a[sorted.column] < b[sorted.column];

        reversedCondition =
          sorted.status === 1 ? a[sorted.column] < b[sorted.column] : a[sorted.column] > b[sorted.column];

        return condition ? 1 : reversedCondition ? -1 : 0;
      });

      // TODO: check whether this logic is valid in all cases
      if (totalRecords === undefined) {
        // Splitting data in frontend pagination
        const start = (pageNumber - 1) * pageSize;
        const sortedPaginatedResult = result?.slice(start, start + pageSize);
        setRenderedData(sortedPaginatedResult);
      } else setRenderedData(result);
    } else {
      if (totalRecords === undefined) {
        // Splitting data in frontend pagination

        const start = (pageNumber - 1) * pageSize;
        const paginatedResult = data?.slice(start, start + pageSize);
        setRenderedData(paginatedResult);
      } else setRenderedData(data);
    }
  }, [sorted, pageNumber, data]);

  /*
   * Search
   */
  React.useEffect(() => {
    const searchFunc = async () => {
      var results = [];

      if (searchValue) {
        results = data.filter((item: any) =>
          Object.values(item).some(
            (val) => String(val).toLowerCase().indexOf(searchValue.toString().toLowerCase()) !== -1
          )
        );

        setRenderedData(results);
      } else {
        // Splitting data in frontend pagination
        const start = (pageNumber - 1) * pageSize;
        const paginatedResult = data?.slice(start, start + pageSize);
        setRenderedData(paginatedResult);
      }
    };

    searchFunc();
  }, [searchValue]);

  const onSelectAllChange = (value: boolean) => {
    const checkboxes = document.getElementsByName('selectElement');

    let result = selected;
    value ? setChecked([...checked, pageNumber]) : setChecked(checked.filter((e) => e !== pageNumber));

    for (var i = 0; i < checkboxes.length; i++) {
      //@ts-ignore
      checkboxes[i].checked = value;

      value
        ? result.push(parseInt(checkboxes[i].id))
        : (result = result.filter((e) => e !== parseInt(checkboxes[i].id)));
    }

    setSelected(result);
  };

  return (
    <>
      {/* Grid */}
      <div dir={`${rtl && 'rtl'}`} className="overflow-hidden rounded-xl border border-dustyGray w-full">
        {/* Grid toolbar */}
        <div className="flex justify-between py-2 px-8">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => exportFromJSON({ data, fileName, exportType })}
          >
            <Download color="light" />
            <p className="text-dustyBlue ml-2">{rtl ? 'تصدير اكسل' : 'Excel export'}</p>
          </div>

          <label className="relative block text-gray-400 focus-within:text-gray-600">
            <div
              className={` ${
                rtl ? 'left-1' : 'right-1'
              } pointer-events-none absolute top-1/2 -translate-y-1/2 mt-[2px] transform`}
            >
              <Search color="light" />
            </div>

            <input
              value={searchValue}
              placeholder={rtl ? 'البحث' : 'Search'}
              onChange={(e: any) => setSearchValue(e.target.value)}
              className="rounded-lg bg-dustyGray px-2 py-1 text-dustyBlue outline-none placeholder:text-dustyBlue"
            />
          </label>
        </div>

        <div className="pb-4">
          <div className="overflow-y-auto" style={{ height: `${height}px` }}>
            {/* Grid header */}
            <div className="min-w-[1000px] flex justify-between bg-dustyGray px-8 py-3">
              {onSelect !== undefined && (
                <input
                  className="w-[15px] accent-dustyBlue"
                  type="checkbox"
                  checked={checked.includes(pageNumber)}
                  onChange={(e) => onSelectAllChange(e.target.checked)}
                />
              )}

              {columns?.map(({ header, field, width }: any) => (
                <p
                  key={header}
                  onClick={() =>
                    setSorted((prev) => {
                      if (prev.column !== field) {
                        return { column: field, status: 1 };
                      } else if (prev.column === field && prev.status === 1) {
                        return { ...prev, status: 2 };
                      }
                      return { column: '', status: 0 };
                    })
                  }
                  className={`text-dustyBlue cursor-pointer flex items-center`}
                  style={{ width: `${width}px` }}
                >
                  {header}
                  <span className="ml-4">
                    {sorted.column === field ? sorted.status === 1 ? <ArrowUp /> : <ArrowDown /> : null}
                  </span>
                </p>
              ))}

              {(onView !== undefined || onEdit !== undefined || onDelete !== undefined) && (
                <p className="text-dustyBlue flex items-center" style={{ width: '7%' }}>
                  Actions
                </p>
              )}
            </div>

            {loading && (
              <div className="flex justify-center rounded-lg bg-white p-8" style={{ height: `${height}px` }}>
                <ClipLoader color="#039FC8" size={80} />
              </div>
            )}

            {/* Grid body */}
            {!loading &&
              !!renderedData?.length &&
              renderedData?.map((d: any) => (
                <div
                  key={d.id}
                  className={`flex justify-between border-b-2 border-lightDustyGray px-8 py-3 min-w-[1000px] ${
                    pageSize > data?.length ? 'last:border-b-0' : ''
                  }`}
                >
                  {onSelect !== undefined && (
                    <input
                      id={d.id}
                      type="checkbox"
                      name="selectElement"
                      checked={selected.includes(d.id)}
                      onChange={(e) => onRowSelection(e.target.checked, d.id)}
                      className="w-[15px] accent-dustyBlue"
                    />
                  )}

                  {columns.map(({ field, width }: any) => (
                    <p key={field} className="text-dustyBlue truncate" style={{ width: `${width}px` }}>
                      {d[field]}
                    </p>
                  ))}

                  {(onView !== undefined || onEdit !== undefined || onDelete !== undefined) && (
                    <div className="flex" style={{ width: '7%' }}>
                      {onView !== undefined && (
                        <button className="me-2" onClick={() => onView!(d.id)}>
                          <Eye color="light" />
                        </button>
                      )}

                      {onEdit !== undefined && (
                        <button className="me-2" onClick={() => onEdit!(d.id)}>
                          <Pencil color="light" />
                        </button>
                      )}

                      {onDelete !== undefined && (
                        <button onClick={() => onDelete!(d.id)}>
                          <Trash color="light" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {(!loading && renderedData?.length && totalRecords ? pageSize < totalRecords : pageSize < data?.length) && (
            <div dir="ltr" className="mt-4 flex ps-4 pe-4 justify-between items-center lg:w-1/5 w-2/5">
              <PaginationComponent
                pageNumber={pageNumber}
                pages={totalRecords ? Math.ceil(totalRecords / pageSize) : Math.ceil(data?.length / pageSize)}
                paginate={paginate}
              />
            </div>
          )}

          {!renderedData?.length && !loading && (
            <p className="flex justify-center font-assistant text-lg text-dustyBlue pt-8 pb-4">No data to display</p>
          )}
        </div>
      </div>

      {onSelect !== undefined && (
        <button
          type="submit"
          onClick={() => onSelect!(selected)}
          className="mt-4 rounded-lg bg-dustyBlue px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
        >
          {rtl ? 'إدخال' : 'Submit'}
        </button>
      )}
    </>
  );
};
