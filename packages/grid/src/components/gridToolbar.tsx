import * as React from 'react';
import { Download, Search } from '../icons';
import exportFromJSON from 'export-from-json';

interface myProps {
  rtl: boolean;
  color: string;
  search: boolean;
  jsonExport: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  data: any;
}

/*
 * Grid toolbar
 * Json data export & Search functionality
 */
const GridToolbar: React.FC<myProps> = ({ rtl, data, color, search, jsonExport, searchValue, setSearchValue }) => {
  const exportType = exportFromJSON.types?.csv;
  const fileName = 'download';

  return (
    <div id="table-toolbar" className="border-b flex justify-between py-2 px-8">
      <div
        className={`${!jsonExport && 'invisible'} flex cursor-pointer items-center`}
        onClick={() => exportFromJSON({ data, fileName, exportType })}
        id="export-button"
      >
        <Download {...{ color }} />
        <p style={{ color: color }} className="ml-2 md:block hidden" id="export-text">
          {rtl ? 'تصدير اكسل' : 'Excel export'}
        </p>
      </div>

      <label
        className={`${!search && 'invisible'} relative block text-gray-400 focus-within:text-gray-600`}
        id="search-label"
      >
        <div
          className={` ${
            rtl ? 'left-1' : 'right-1'
          } pointer-events-none absolute top-1/2 -translate-y-1/2 mt-[2px] transform`}
          id="search-icon-container"
        >
          <Search {...{ color }} />
        </div>

        <input
          value={searchValue}
          placeholder={rtl ? 'البحث' : 'Search'}
          onChange={(e: any) => setSearchValue(e.target.value)}
          style={{ color: color }}
          className="rounded-lg bg-lightGray px-2 py-1 outline-none"
          id="search-input"
        />
      </label>
    </div>
  );
};

export default GridToolbar;
