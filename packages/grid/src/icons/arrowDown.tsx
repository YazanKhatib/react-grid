import * as React from 'react';

interface myProps {
  color: string;
  className?: string;
  onClick?: () => void;
}

export const ArrowDown: React.FC<myProps> = ({ onClick, className, color }) => {
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
        d="M19 14L12 21M12 21L5 14M12 21V3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
