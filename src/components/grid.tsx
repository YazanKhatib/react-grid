import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import _, { round } from 'lodash';
import exportFromJSON from 'export-from-json';
import { Else, If, Then } from 'react-if';
import { gridProps } from 'types';
import { Trash, Pencil, Download, Eye } from '../icons';
import PaginationComponent from './pagination';

export const Grid: React.FC<gridProps> = ({
  data,
  columns,
  loading,
  pageSize = 10,
  pageNumber = 1,
  totalRecords,
  select = false,
  onView,
  onEdit,
  onDelete,
  onSelect,
  setPageNumber,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const fileName = 'download';
  const exportType = exportFromJSON.types?.csv;

  // Temporarily store the search results
  const [searchResults, setSearchResults] = React.useState(data);

  const onRowSelection = (value: any, id: string) => {
    var result: string[] = selected;

    if (value) result.push(id);
    else result = result.filter(v => v !== id);

    setSelected(result);
  };

  React.useEffect(() => {
    console.log({ pageNumber });
  }, [pageNumber]);
  /*
   * Pagination logic
   */
  const paginate = (action: string) => {
    /*
     * TODO
     * Backend pagination (totalRecords, pageSize and PageNumber)
     * Data is recieved from the backend, you don't need to handle it.
     *
     * Frontend pagination (pageSize, pageNumber)
     * You need to split the data
     */

    totalRecords = totalRecords === undefined ? data?.length : totalRecords;

    switch (action) {
      case 'first':
        return setPageNumber!(1);
      case 'next':
        return pageNumber! + 1 <= round(totalRecords! / pageSize) && setPageNumber!(pageNumber! + 1);
      case 'previous':
        return pageNumber! > 1 && setPageNumber!(pageNumber! - 1);
      case 'last':
        return totalRecords! > pageSize && setPageNumber!(round(totalRecords! / pageSize));
    }
  };

  React.useEffect(() => {
    /*
     * Need to split the data based on pagination parameters
     * Search will be based on all of the data
     */
    const searchFunc = async () => {
      var results = [];

      const start = (pageNumber - 1) * pageSize;

      const result = data.slice(start, start + pageSize);
      console.log({ start, pageSize, result });
      setSearchResults(result);

      // TODO: Search functionality
      if (searchValue) {
        for (var i = 0; i < data?.length; i++) {
          for (var key in data[i]) {
            if (typeof _.get(data[i], key) !== 'string') continue;

            if (
              _.get(data[i], key)
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) !== -1
            ) {
              results.push(data[i]);
              break;
            }
          }
        }
        setSearchResults(results);
      }
    };

    searchFunc();
  }, [searchValue, pageNumber, data]);

  const widthArray = ['w-xs', 'w-sm', 'w-lg'];

  return loading ? (
    <div className="flex justify-center rounded-lg bg-white p-8">
      <ClipLoader color="#039FC8" size={80} />
    </div>
  ) : (
    <>
      {/* // TODO: Delete confirmation popup */}
      {/* <Popup
        status={popup}
        onSubmit={async () => {
          setPopup(!popup);
          await axios.delete(`/api/${resource}/${recordId}`);
          navigate(0);
        }}
        onToggle={() => setPopup(!popup)}
      /> */}

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
            {/* <img
              width="20px"
              alt="search icon"
              src={require('../icons/search.svg')}
              className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 transform"
            /> */}

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
          <If condition={select}>
            <Then>
              <input
                className="invisible w-[15px] accent-dustyBlue"
                type="checkbox"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
            </Then>
          </If>

          {columns?.map(({ header, width }: any) => (
            <p key={header} className={` ${widthArray[parseInt(width)]} text-dustyBlue`}>
              {header}
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

        {/* Grid data */}
        <div className="py-4">
          <If condition={searchResults?.length}>
            <Then>
              {searchResults?.map((d: any) => (
                <div
                  key={d.id}
                  className={`flex justify-between border-b-2 border-lightDustyGray px-8 py-3 last:border-b-0`}
                >
                  <If condition={select}>
                    <Then>
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={e => onRowSelection(e.target.checked, d.id)}
                        className="w-[15px] accent-dustyBlue"
                      />
                    </Then>
                  </If>

                  {columns.map(({ field, width }: any) => (
                    <p key={field} className={` ${widthArray[parseInt(width)]} text-dustyBlue`}>
                      {_.get(d, field)}
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

              <div className="mt-4 flex pl-4 justify-between items-center" style={{ width: '20%' }}>
                <PaginationComponent pageNumber={pageNumber} paginate={paginate} />
              </div>
            </Then>
            <Else>
              <p className="flex justify-center font-assistant text-lg text-dustyBlue">No data to display</p>
            </Else>
          </If>
        </div>
      </div>

      <If condition={select}>
        <Then>
          <button
            onClick={() => onSelect!(selected)}
            type="submit"
            className="mt-4 rounded-lg bg-secondary px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Submit
          </button>
        </Then>
      </If>
    </>
  );
};
