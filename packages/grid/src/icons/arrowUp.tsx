import * as React from 'react';

interface myProps {
  className?: string;
  onClick?: () => void;
}

export const ArrowUp: React.FC<myProps> = ({ onClick, className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      onClick={onClick}
      className={className}
      fill="#406882"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10L12 3M12 3L19 10M12 3V21"
        stroke="#406882"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
