import * as React from 'react';
import { getProp } from './helpers';
import { gridProps } from '../types';
import { Trash, Pencil, Eye, ArrowUp, ArrowDown } from '../icons';
import GridToolbar from './gridToolbar';
import PaginationComponent from './pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import '../index.css';

const Grid: React.FC<gridProps> = ({
  data,
  search = true,
  jsonExport = true,
  color = '#406882',
  height,
  variant = 'default',
  columns,
  loading = false,
  pageSize = 10,
  pageNumber = 1,
  totalRecords,
  rtl = false,
  viewIcon,
  editIcon,
  deleteIcon,
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
        condition =
          sorted.status === 1
            ? getProp(a, sorted.column) > getProp(b, sorted.column)
            : getProp(a, sorted.column) < getProp(b, sorted.column);

        reversedCondition =
          sorted.status === 1
            ? getProp(a, sorted.column) < getProp(b, sorted.column)
            : getProp(a, sorted.column) > getProp(b, sorted.column);

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
      <div
        dir={`${rtl && 'rtl'}`}
        className={`${variant !== 'stripe' ? 'border border-lightGray' : 'p-6'} 
        overflow-hidden rounded-xl w-full bg-white`}
        id="table-container"
      >
        {/* Grid toolbar */}
        {(search || jsonExport) && (
          <GridToolbar {...{ rtl, data, color, search, jsonExport, searchValue, setSearchValue }} />
        )}

        <div>
          <div className="overflow-y-auto" style={{ height: `${height}px` }}>
            {/* Table header */}
            <div
              className={` ${
                variant == 'stripe' ? 'border-b' : 'bg-lightGray'
              } min-w-[1000px] flex justify-between px-8 py-3`}
              id="table-header"
            >
              {onSelect !== undefined && (
                <input
                  type="checkbox"
                  style={{ color: color }}
                  className="xl:mr-0 mr-4 w-[15px] accent-dustyBlue"
                  checked={checked.includes(pageNumber)}
                  onChange={(e) => onSelectAllChange(e.target.checked)}
                  id="select-all-checkbox"
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
                  className={`cursor-pointer flex items-center`}
                  style={{ width: `${width}px`, color: color }}
                  id="column"
                >
                  {header}
                  <span className="ml-4">
                    {sorted.column === field ? (
                      sorted.status === 1 ? (
                        <ArrowUp {...{ color }} />
                      ) : (
                        <ArrowDown {...{ color }} />
                      )
                    ) : null}
                  </span>
                </p>
              ))}

              {(onView !== undefined || onEdit !== undefined || onDelete !== undefined) && (
                <p className="flex items-center" style={{ width: '7%', color: color }} id="actions-header">
                  Actions
                </p>
              )}
            </div>

            {loading && (
              <div className="flex justify-center rounded-lg bg-white p-8" id="loading-spinner">
                <ClipLoader color="#039FC8" size={80} />
              </div>
            )}

            {/* Grid body */}
            {!loading &&
              !!renderedData?.length &&
              renderedData?.map((d: any, index: number) => (
                <div
                  key={d.id}
                  className={`flex justify-between items-center px-8 py-3 min-w-[1000px] 
                  ${pageSize > data?.length ? 'last:border-b-0' : ''} 
                  ${variant !== 'stripe' && 'border-b border-lightDustyGray'} 
                  ${variant === 'stripe' && index % 2 === 0 && 'bg-lightGray'} 
                  ${variant === 'stripe' && index === data.length - 1 && 'border-b border-lightGray'}`}
                  id="row"
                >
                  {onSelect !== undefined && (
                    <input
                      type="checkbox"
                      name="selectElement"
                      checked={selected.includes(d.id)}
                      onChange={(e) => onRowSelection(e.target.checked, d.id)}
                      className="xl:mr-0 mr-4 w-[15px] accent-dustyBlue"
                      id={d.id}
                    />
                  )}

                  {columns.map(({ field, width, type }: any) => (
                    <p key={field} className="truncate" style={{ width: `${width}px`, color: color }} id="field">
                      {type === 'img' ? <img src={getProp(d, field)} alt={field} /> : getProp(d, field)}
                    </p>
                  ))}

                  {(!!onView || !!onEdit || !!onDelete) && (
                    <div className="flex" style={{ width: '7%' }} id="actions-row">
                      {!!onView && (
                        <button className="me-2" onClick={() => onView!(d)} id="view-button">
                          {viewIcon ? viewIcon : <Eye {...{ color }} />}
                        </button>
                      )}

                      {!!onEdit && (
                        <button className="me-2" onClick={() => onEdit!(d)} id="edit-button">
                          {editIcon ? editIcon : <Pencil {...{ color }} />}
                        </button>
                      )}

                      {!!onDelete && (
                        <button onClick={() => onDelete!(d)} id="delete-button">
                          {deleteIcon ? deleteIcon : <Trash {...{ color }} />}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {(!loading && renderedData?.length && totalRecords ? pageSize < totalRecords : pageSize < data?.length) && (
            <div className={` ${variant === 'stripe' && 'bg-lightGray rounded-b-xl'} py-3`}>
              <div
                dir="ltr"
                className="flex ps-4 pe-4 justify-between items-center lg:w-1/5 md:w-2/5"
                id="pagination-container"
              >
                <PaginationComponent
                  {...{ paginate, pageNumber, color }}
                  pages={totalRecords ? Math.ceil(totalRecords / pageSize) : Math.ceil(data?.length / pageSize)}
                />
              </div>
            </div>
          )}

          {!renderedData?.length && !loading && (
            <p className="flex justify-center font-assistant text-lg text-dustyBlue pt-8 pb-4" id="no-data-message">
              No data to display
            </p>
          )}
        </div>
      </div>

      {onSelect !== undefined && (
        <button
          type="submit"
          onClick={() => onSelect!(selected)}
          style={{ backgroundColor: color }}
          className="mt-4 rounded-lg px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          id="submit-button"
        >
          {rtl ? 'إدخال' : 'Submit'}
        </button>
      )}
    </>
  );
};

export default Grid;
