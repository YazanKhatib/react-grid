import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { IColumn } from 'interfaces';
// import axios from 'api';
// import pluralize from 'pluralize';
import ClipLoader from 'react-spinners/ClipLoader';
// import { Popup } from 'components';
import _, { round } from 'lodash';
import exportFromJSON from 'export-from-json';
import { Else, If, Then } from 'react-if';
import { Trash, Pencil, Download, Eye } from '../icons';

export interface gridProps {
  data: any;
  columns: any;
  resource: string;
  onView?: (id: string) => {};
  onEdit?: (id: string) => {};
  onDelete?: (id: string) => {};
  select?: boolean;
  loading: boolean;
  onSelect?: (ids: string[]) => void;
  pageNumber?: number;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
}

export const Grid: React.FC<gridProps> = ({
  data,
  columns,
  loading,
  pageNumber = 1,
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
  const pageSize = 10;

  // Temporarily store the search results
  const [searchResults, setSearchResults] = React.useState(data);

  const onRowSelection = (value: any, id: string) => {
    var result: string[] = selected;

    if (value) result.push(id);
    else result = result.filter(v => v !== id);

    setSelected(result);
  };

  const paginate = (action: string) => {
    var count: number = 11;

    if (action === 'first') setPageNumber!(1);
    else if (action === 'next' && pageNumber! + 1 <= round(count / pageSize))
      setPageNumber!(pageNumber! + 1);
    else if (action === 'previous' && pageNumber! > 1)
      setPageNumber!(pageNumber! - 1);
    else if (action === 'last') setPageNumber!(round(count / pageSize));
  };
  React.useEffect(() => {
    // TODO: Search functionality
    const searchFunc = async () => {
      var results = [];

      for (var i = 0; i < data?.length; i++) {
        for (var key in data[i]) {
          if (typeof _.get(data[i], key) !== 'string') continue;

          // console.log(
          //     _.get(data[i], key),
          //     searchValue,
          //     JSON.stringify(_.get(data[i], key)).indexOf(searchValue) !== -1,
          // );
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
    };

    searchFunc();
  }, [searchValue, data]);

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

      <div className="overflow-hidden rounded-xl border border-dustyGray">
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
            <p
              key={header}
              className={` ${widthArray[parseInt(width)]} text-dustyBlue`}
            >
              {header}
            </p>
          ))}

          <If
            condition={
              onView !== undefined ||
              onEdit !== undefined ||
              onDelete !== undefined
            }
          >
            <Then>
              <p className="w-[10 %] text-dustyBlue">Actions</p>
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
                  className={`flex justify-between border-b-2 border-lightDustyGray px-8 py-3 last:border-b-0 `}
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
                    <p
                      key={field}
                      className={` ${
                        widthArray[parseInt(width)]
                      } text-dustyBlue`}
                    >
                      {_.get(d, field)}
                    </p>
                  ))}

                  <If
                    condition={
                      onView !== undefined ||
                      onEdit !== undefined ||
                      onDelete !== undefined
                    }
                  >
                    <Then>
                      <div className="flex w-[10%]">
                        <If condition={onView !== undefined}>
                          <Then>
                            <button
                              className="mr-2"
                              onClick={() => onView!(d.id)}
                            >
                              <Eye color="light" />
                            </button>
                          </Then>
                        </If>

                        <If condition={onEdit !== undefined}>
                          <Then>
                            <button
                              className="mr-2"
                              onClick={() => onEdit!(d.id)}
                            >
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

              <div className="mt-4 flex w-2/12 pl-4 justify-between items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => paginate('first')}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.7068 16.207C15.5193 16.3945 15.265 16.4998 14.9998 16.4998C14.7346 16.4998 14.4803 16.3945 14.2928 16.207L9.29279 11.207C9.10532 11.0195 9 10.7652 9 10.5C9 10.2348 9.10532 9.98053 9.29279 9.793L14.2928 4.793C14.385 4.69749 14.4954 4.6213 14.6174 4.5689C14.7394 4.51649 14.8706 4.4889 15.0034 4.48775C15.1362 4.48659 15.2678 4.51189 15.3907 4.56218C15.5136 4.61246 15.6253 4.68671 15.7192 4.7806C15.8131 4.87449 15.8873 4.98615 15.9376 5.10904C15.9879 5.23194 16.0132 5.36362 16.012 5.4964C16.0109 5.62918 15.9833 5.7604 15.9309 5.8824C15.8785 6.00441 15.8023 6.11475 15.7068 6.207L11.4138 10.5L15.7068 14.793C15.8943 14.9805 15.9996 15.2348 15.9996 15.5C15.9996 15.7652 15.8943 16.0195 15.7068 16.207Z"
                      fill="#6998AB"
                    />
                    <rect
                      x="5"
                      y="4.5"
                      width="2"
                      height="12"
                      rx="1"
                      fill="#6998AB"
                    />
                  </svg>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => paginate('next')}
                >
                  <svg
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.70701 1.24422C5.89448 1.43002 5.9998 1.68198 5.9998 1.9447C5.9998 2.20742 5.89448 2.45939 5.70701 2.64519L2.41401 5.90784L5.70701 9.17049C5.80252 9.26188 5.8787 9.37121 5.93111 9.49209C5.98352 9.61297 6.01111 9.74298 6.01226 9.87454C6.01341 10.0061 5.98811 10.1366 5.93783 10.2583C5.88755 10.3801 5.8133 10.4907 5.71941 10.5837C5.62551 10.6768 5.51386 10.7503 5.39096 10.8001C5.26807 10.85 5.13639 10.875 5.00361 10.8739C4.87083 10.8727 4.73961 10.8454 4.61761 10.7935C4.4956 10.7416 4.38526 10.6661 4.29301 10.5715L0.29301 6.60832C0.105539 6.42252 0.000223885 6.17056 0.000223897 5.90784C0.000223908 5.64512 0.105539 5.39315 0.293011 5.20735L4.29301 1.24422C4.48054 1.05848 4.73485 0.954132 5.00001 0.954132C5.26517 0.954132 5.51948 1.05848 5.70701 1.24422V1.24422Z"
                      fill="#406882"
                    />
                  </svg>
                </div>
                <p className="text-dustyBlue">{pageNumber}</p>

                <div
                  className="cursor-pointer"
                  onClick={() => paginate('next')}
                >
                  <svg
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.29299 10.5715C1.10552 10.3857 1.0002 10.1337 1.0002 9.87097C1.0002 9.60825 1.10552 9.35629 1.29299 9.17049L4.58599 5.90784L1.29299 2.64519C1.19748 2.55379 1.1213 2.44446 1.06889 2.32358C1.01648 2.2027 0.988893 2.07269 0.987739 1.94114C0.986585 1.80958 1.01189 1.67912 1.06217 1.55735C1.11245 1.43559 1.1867 1.32497 1.28059 1.23194C1.37449 1.13891 1.48614 1.06534 1.60904 1.01552C1.73193 0.965708 1.86361 0.940638 1.99639 0.941781C2.12917 0.942925 2.26039 0.970257 2.38239 1.02218C2.5044 1.07411 2.61474 1.14959 2.70699 1.24422L6.70699 5.20735C6.89446 5.39315 6.99978 5.64512 6.99978 5.90784C6.99978 6.17056 6.89446 6.42252 6.70699 6.60832L2.70699 10.5715C2.51946 10.7572 2.26515 10.8615 1.99999 10.8615C1.73483 10.8615 1.48052 10.7572 1.29299 10.5715V10.5715Z"
                      fill="#406882"
                    />
                  </svg>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => paginate('next')}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.29321 4.793C4.48074 4.60553 4.73505 4.50022 5.00021 4.50022C5.26538 4.50022 5.51968 4.60553 5.70721 4.793L10.7072 9.793C10.8947 9.98053 11 10.2348 11 10.5C11 10.7652 10.8947 11.0195 10.7072 11.207L5.70721 16.207C5.61497 16.3025 5.50462 16.3787 5.38262 16.4311C5.26061 16.4835 5.12939 16.5111 4.99661 16.5123C4.86384 16.5134 4.73216 16.4881 4.60926 16.4378C4.48636 16.3875 4.37471 16.3133 4.28082 16.2194C4.18693 16.1255 4.11267 16.0139 4.06239 15.891C4.01211 15.7681 3.98681 15.6364 3.98796 15.5036C3.98912 15.3708 4.0167 15.2396 4.06911 15.1176C4.12152 14.9956 4.1977 14.8853 4.29321 14.793L8.58621 10.5L4.29321 6.207C4.10574 6.01948 4.00043 5.76517 4.00043 5.5C4.00043 5.23484 4.10574 4.98053 4.29321 4.793Z"
                      fill="#6998AB"
                    />
                    <rect
                      x="15"
                      y="16.5"
                      width="2"
                      height="12"
                      rx="1"
                      transform="rotate(180 15 16.5)"
                      fill="#6998AB"
                    />
                  </svg>
                </div>
              </div>
            </Then>
            <Else>
              <p className="flex justify-center font-assistant text-lg text-dustyBlue">
                No data to display
              </p>
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
