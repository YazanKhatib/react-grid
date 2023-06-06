import * as React from 'react';

interface myProps {
  color: string;
  className?: string;
  onClick?: () => void;
}

export const ArrowUp: React.FC<myProps> = ({ onClick, className, color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10L12 3M12 3L19 10M12 3V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
