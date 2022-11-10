import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-solid-svg-icons';
import { toast } from 'react-toastify';
import { IColumn } from 'interfaces';
import axios from 'api';
import pluralize from 'pluralize';
import ClipLoader from 'react-spinners/ClipLoader';
import { Popup } from 'components';
import _, { round } from 'lodash';
import exportFromJSON from 'export-from-json';
import { Else, If, Then } from 'react-if';

interface gridProps {
    data: any;
    columns: IColumn[];
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

const Grid: React.FC<gridProps> = ({
    data,
    columns,
    loading,
    resource,
    pageNumber,
    del = true,
    edit = true,
    show = false,
    select = false,
    onSelect,
    setPageNumber,
}) => {
    const [popup, setPopup] = React.useState(false);
    const [recordId, setRecordId] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [selected, setSelected] = React.useState<string[]>([]);
    const fileName = 'download';
    const exportType = exportFromJSON.types.csv;
    const pageSize = 10;

    // Temporarily store the search results
    const [searchResults, setSearchResults] = React.useState(data);
    const navigate = useNavigate();

    const onView = (id: string) => {
        navigate(`/${pluralize(resource)}/` + id);
    };

    const onEdit = (id: string) => {
        navigate(`/${pluralize(resource)}/edit/` + id);
    };

    // params: any
    const onDelete = async (id: string) => {
        try {
            setPopup(true);
            setRecordId(id);
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const onRowSelection = (value: any, id: string) => {
        var result: string[] = selected;

        if (value) result.push(id);
        else result = result.filter((v) => v !== id);

        setSelected(result);
    };

    const paginate = (action: string) => {
        var count: number = 11;

        if (action === 'first') setPageNumber!(1);
        else if (action === 'next' && pageNumber! + 1 <= round(count / pageSize)) setPageNumber!(pageNumber! + 1);
        else if (action === 'previous' && pageNumber! > 1) setPageNumber!(pageNumber! - 1);
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
                    if (_.get(data[i], key).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
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
            <Popup
                status={popup}
                onSubmit={async () => {
                    setPopup(!popup);
                    await axios.delete(`/api/${resource}/${recordId}`);
                    navigate(0);
                }}
                onToggle={() => setPopup(!popup)}
            />

            <div className="overflow-hidden rounded-xl border border-dustyGray">
                {/* Grid toolbar */}
                <div className="flex justify-between py-2 px-8">
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => exportFromJSON({ data, fileName, exportType })}
                    >
                        <img width="28px" alt="download icon" className="mr-2" src="/icons/document-download.svg" />
                        <p className="text-dustyBlue">Excel export</p>
                    </div>

                    <label className="relative block text-gray-400 focus-within:text-gray-600">
                        <img
                            src="/icons/search.svg"
                            width="20px"
                            className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 transform"
                            alt="search icon"
                        />

                        <input
                            value={searchValue}
                            onChange={(e: any) => setSearchValue(e.target.value)}
                            placeholder="Search"
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

                    {columns.map(({ header, width }) => (
                        <p className={` ${widthArray[parseInt(width)]} text-dustyBlue`}>{header}</p>
                    ))}

                    <If condition={show || edit || del}>
                        <Then>
                            <p className="w-[7%] text-dustyBlue">Actions</p>
                        </Then>
                    </If>
                </div>

                {/* Grid data */}
                <div className="py-4">
                    <If condition={searchResults.length}>
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
                                                onChange={(e) => onRowSelection(e.target.checked, d.id)}
                                                className="w-[15px] accent-dustyBlue"
                                            />
                                        </Then>
                                    </If>

                                    {columns.map(({ field, width }) => (
                                        <p className={` ${widthArray[parseInt(width)]} text-dustyBlue`}>
                                            {_.get(d, field)}
                                        </p>
                                    ))}

                                    <If condition={show || edit || del}>
                                        <Then>
                                            <div className="flex w-[7%]">
                                                <If condition={show}>
                                                    <Then>
                                                        <button className="mr-4" onClick={() => onView(d.id)}>
                                                            <FontAwesomeIcon size="1x" icon={faEye} color="#406882" />
                                                        </button>
                                                    </Then>
                                                </If>
                                                <If condition={edit}>
                                                    <Then>
                                                        <button className="mr-4" onClick={() => onEdit(d.id)}>
                                                            <img src="/icons/pencil-alt.svg" alt="edit" />
                                                        </button>
                                                    </Then>
                                                </If>
                                                <If condition={del}>
                                                    <Then>
                                                        <button onClick={() => onDelete(d.id)}>
                                                            <img src="icons/trash.svg" alt="delete" />
                                                        </button>
                                                    </Then>
                                                </If>
                                            </div>
                                        </Then>
                                    </If>
                                </ul>
                            ))}

                            <div className="bottom-6 mt-4 flex w-[20%] justify-between pl-4">
                                <img
                                    width={22}
                                    alt="double arrow icon"
                                    className="cursor-pointer"
                                    onClick={() => paginate('first')}
                                    src="/icons/chevron-double-left.svg"
                                />
                                <img
                                    className="cursor-pointer"
                                    width={9}
                                    alt="left arrow"
                                    onClick={() => paginate('previous')}
                                    src="/icons/arrow-left.svg"
                                />
                                <p className="text-dustyBlue">{pageNumber}</p>
                                <img
                                    width={9}
                                    alt="right arrow"
                                    className="cursor-pointer"
                                    onClick={() => paginate('next')}
                                    src="/icons/arrow-right.svg"
                                />
                                <img
                                    width={22}
                                    alt="double arrow icon"
                                    className="cursor-pointer"
                                    onClick={() => paginate('last')}
                                    src="/icons/chevron-double-right.svg"
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

export default Grid;
