import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import exportFromJSON from 'export-from-json';
import { ceil, get } from 'lodash';
import { Else, If, Then } from 'react-if';
import { gridProps } from '../types';
import { Trash, Pencil, Download, Eye, Search, ArrowUp, ArrowDown } from '../icons';
import PaginationComponent from './pagination';
import '../index.css';

export const Grid: React.FC<gridProps> = ({
  data,
  columns,
  loading = false,
  pageSize = 10,
  pageNumber = 1,
  totalRecords,
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
        return pageNumber! + 1 <= ceil(totalRecords! / pageSize) && setPageNumber!(pageNumber! + 1);
      case 'previous':
        return pageNumber! > 1 && setPageNumber!(pageNumber! - 1);
      case 'last':
        return totalRecords! > pageSize && setPageNumber!(ceil(totalRecords! / pageSize));
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
            ? get(a, sorted.column) > get(b, sorted.column)
            : get(a, sorted.column) < get(b, sorted.column);

        reversedCondition =
          sorted.status === 1
            ? get(a, sorted.column) < get(b, sorted.column)
            : get(a, sorted.column) > get(b, sorted.column);

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
   * Search and Pagination
   */
  React.useEffect(() => {
    const searchFunc = async () => {
      var results = [];

      //* Search functionality
      if (searchValue) {
        for (var i = 0; i < data?.length; i++) {
          for (var key in data[i]) {
            if (typeof get(data[i], key) !== 'string') continue;

            if (get(data[i], key).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
              results.push(data[i]);
              break;
            }
          }
        }
        setRenderedData(results);
      } else {
        // Splitting data in frontend pagination

        if (totalRecords === undefined) {
          const start = (pageNumber - 1) * pageSize;
          const paginatedResult = data?.slice(start, start + pageSize);
          setRenderedData(paginatedResult);
        }
      }
    };

    searchFunc();
  }, [searchValue]);

  const onSelectAllChange = (value: boolean) => {
    const checkboxes = document.getElementsByName('selectElement');

    let result = selected;
    console.log({ value });
    value ? setChecked([...checked, pageNumber]) : setChecked(checked.filter((e) => e !== pageNumber));
    console.log({ first: result });
    for (var i = 0; i < checkboxes.length; i++) {
      //@ts-ignore
      checkboxes[i].checked = value;
      // console.log(checkboxes[i].id, result);
      value
        ? result.push(parseInt(checkboxes[i].id))
        : (result = result.filter((e) => e !== parseInt(checkboxes[i].id)));
    }

    setSelected(result);
  };

  const widthArray = ['w-xs', 'w-sm', 'w-lg'];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-dustyGray w-full">
        {/* Grid toolbar */}
        <div className="flex justify-between py-2 px-8">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => exportFromJSON({ data, fileName, exportType })}
          >
            <Download color="light" />
            <p className="text-dustyBlue ml-2">Excel export</p>
          </div>

          <label className="relative block text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 mt-[2px] transform">
              <Search color="light" />
            </div>

            <input
              value={searchValue}
              placeholder="Search"
              onChange={(e: any) => setSearchValue(e.target.value)}
              className="rounded-lg bg-dustyGray px-2 py-1 text-dustyBlue outline-none placeholder:text-dustyBlue"
            />
          </label>
        </div>

        {/* Grid header */}
        <div className={` flex justify-between bg-dustyGray px-8 py-3`}>
          {/* //TODO: SelectAll functionality */}
          <If condition={onSelect !== undefined}>
            <Then>
              <input
                className="w-[15px] accent-dustyBlue"
                type="checkbox"
                checked={checked.includes(pageNumber)}
                onChange={(e) => onSelectAllChange(e.target.checked)}
              />
            </Then>
          </If>

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
              className={` ${widthArray[parseInt(width)]} text-dustyBlue cursor-pointer flex items-center`}
            >
              {header}
              <span className="ml-4">
                <If condition={sorted.column === field}>
                  <Then>
                    <If condition={sorted.status === 1}>
                      <Then>
                        <ArrowUp />
                      </Then>
                      <Else>
                        <ArrowDown />
                      </Else>
                    </If>
                  </Then>
                </If>
              </span>
            </p>
          ))}
          <If condition={onView !== undefined || onEdit !== undefined || onDelete !== undefined}>
            <Then>
              <p className="text-dustyBlue" style={{ width: '7%' }}>
                Actions
              </p>
            </Then>
          </If>
        </div>

        {/* //TODO: add height property */}
        {/* Grid data */}
        <div className="py-4">
          <If condition={renderedData?.length}>
            <Then>
              {loading && (
                <div className="flex justify-center rounded-lg bg-white p-8">
                  <ClipLoader color="#039FC8" size={80} />
                </div>
              )}

              {!loading &&
                renderedData?.map((d: any) => (
                  <div
                    key={d.id}
                    className={`flex justify-between border-b-2 border-lightDustyGray px-8 py-3 last:border-b-0`}
                  >
                    <If condition={onSelect !== undefined}>
                      <Then>
                        <input
                          id={d.id}
                          type="checkbox"
                          name="selectElement"
                          checked={selected.includes(d.id)}
                          onChange={(e) => onRowSelection(e.target.checked, d.id)}
                          className="w-[15px] accent-dustyBlue"
                        />
                      </Then>
                    </If>

                    {columns.map(({ field, width }: any) => (
                      <p key={field} className={` ${widthArray[parseInt(width)]} text-dustyBlue truncate`}>
                        {get(d, field)}
                      </p>
                    ))}

                    <If condition={onView !== undefined || onEdit !== undefined || onDelete !== undefined}>
                      <Then>
                        <div className="flex" style={{ width: '7%' }}>
                          <If condition={onView !== undefined}>
                            <Then>
                              <button className="mr-2" onClick={() => onView!(d.id)}>
                                <Eye color="light" />
                              </button>
                            </Then>
                          </If>

                          <If condition={onEdit !== undefined}>
                            <Then>
                              <button className="mr-2" onClick={() => onEdit!(d.id)}>
                                <Pencil color="light" />
                              </button>
                            </Then>
                          </If>

                          <If condition={onDelete !== undefined}>
                            <Then>
                              <button onClick={() => onDelete!(d.id)}>
                                <Trash color="light" />
                              </button>
                            </Then>
                          </If>
                        </div>
                      </Then>
                    </If>
                  </div>
                ))}

              <If condition={totalRecords ? pageSize < totalRecords : pageSize < data?.length}>
                <Then>
                  <div className="mt-4 flex pl-4 justify-between items-center" style={{ width: '20%' }}>
                    <PaginationComponent
                      pageNumber={pageNumber}
                      pages={totalRecords ? ceil(totalRecords / pageSize) : ceil(data?.length / pageSize)}
                      paginate={paginate}
                    />
                  </div>
                </Then>
              </If>
            </Then>

            <Else>
              <p className="flex justify-center font-assistant text-lg text-dustyBlue">No data to display</p>
            </Else>
          </If>
        </div>
      </div>

      <If condition={onSelect !== undefined}>
        <Then>
          <button
            type="submit"
            onClick={() => onSelect!(selected)}
            className="mt-4 rounded-lg bg-dustyBlue px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Submit
          </button>
        </Then>
      </If>
    </>
  );
};
