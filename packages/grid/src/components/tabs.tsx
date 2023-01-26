import * as React from 'react';

export interface tabsProps {
  tabs: { id: number; name: string }[];
  active: number;
  setActive: (x: number) => void;
}

export const Tabs: React.FC<tabsProps> = ({ tabs, active, setActive }) => {
  return (
    <>
      <div className="-mb-[1px]">
        {tabs.map(({ id, name }) => (
          <button
            onClick={() => setActive(id)}
            className={` ${
              active === id ? 'bg-dustyBlue font-bold text-white' : 'bg-white font-normal text-dustyBlue'
            } mr-2 w-1/4 rounded-t-lg py-3`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="border-b-[3px] border-dustyBlue" />
    </>
  );
};
