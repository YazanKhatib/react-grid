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
import {
  Trash,
  Search,
  Pencil,
  Download,
  LeftArrow,
  RightArrow,
  DoubleLeftArrow,
  DoubleRightArrow,
} from '../icons';

export interface gridProps {
  data: any;
  columns: any;
  resource: string;
  del?: boolean;
  edit?: boolean;
  show?: boolean;
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
  pageNumber,
  del = true,
  edit = true,
  show = false,
  select = false,
  onSelect,
  setPageNumber,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const fileName = 'download';
  const exportType = exportFromJSON.types.csv;
  const pageSize = 3;

  // Temporarily store the search results
  const [searchResults, setSearchResults] = React.useState(data);

  const onView = () => {
    // navigate(`/${pluralize(resource)}/` + id);
  };

  const onEdit = () => {
    // navigate(`/${pluralize(resource)}/edit/` + id);
  };

  // params: any
  const onDelete = async () => {};

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
            <p className="text-dustyBlue">Excel export</p>
          </div>

          <label className="items-center flex relative text-gray-400 focus-within:text-gray-600">
            <input
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="rounded-lg bg-dustyGray mr-2 px-2 py-1 text-dustyBlue outline-none placeholder:text-dustyBlue"
            />
            <Search color="light" />
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
            <p className={` ${widthArray[parseInt(width)]} text-dustyBlue`}>
              {header}
            </p>
          ))}

          <If condition={show || edit || del}>
            <Then>
              <p className="w-[7%] text-dustyBlue">Actions</p>
            </Then>
          </If>
        </div>

        {/* Grid data */}
        <div className="py-4">
          <If condition={searchResults?.length}>
            <Then>
              {searchResults?.map((d: any) => (
                <ul
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
                      className={` ${
                        widthArray[parseInt(width)]
                      } text-dustyBlue`}
                    >
                      {_.get(d, field)}
                    </p>
                  ))}

                  <If condition={show || edit || del}>
                    <Then>
                      <div className="flex w-[7%]">
                        <If condition={show}>
                          <Then>
                            <button className="mr-4" onClick={() => onView()}>
                              {/* <FontAwesomeIcon size="1x" icon={faEye} color="#406882" /> */}
                            </button>
                          </Then>
                        </If>
                        <If condition={edit}>
                          <Then>
                            <button className="mr-4" onClick={() => onEdit()}>
                              <Pencil color="light" />
                            </button>
                          </Then>
                        </If>
                        <If condition={del}>
                          <Then>
                            <button onClick={() => onDelete()}>
                              <Trash color="light" />
                            </button>
                          </Then>
                        </If>
                      </div>
                    </Then>
                  </If>
                </ul>
              ))}

              <div className="items-center mt-4 flex w-1/5 justify-between pl-4">
                <DoubleLeftArrow
                  color="light"
                  className="cursor-pointer"
                  onClick={() => paginate('first')}
                />

                <LeftArrow
                  color="light"
                  className="mt-3 cursor-pointer"
                  onClick={() => paginate('previous')}
                />

                <p className="text-dustyBlue mr-3">{pageNumber}</p>

                <RightArrow
                  color="light"
                  className="mt-3 cursor-pointer"
                  onClick={() => paginate('next')}
                />

                <DoubleRightArrow
                  color="light"
                  className="cursor-pointer"
                  onClick={() => paginate('last')}
                />
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
