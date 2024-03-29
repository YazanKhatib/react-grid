import * as React from 'react';

interface myProps {
  color: string;
  className?: string;
  onClick?: () => void;
}

export const DoubleRightArrow: React.FC<myProps> = ({ color, onClick, className }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="22"
      height="22"
      viewBox="0 0 21 21"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29321 4.793C4.48074 4.60553 4.73505 4.50022 5.00021 4.50022C5.26538 4.50022 5.51968 4.60553 5.70721 4.793L10.7072 9.793C10.8947 9.98053 11 10.2348 11 10.5C11 10.7652 10.8947 11.0195 10.7072 11.207L5.70721 16.207C5.61497 16.3025 5.50462 16.3787 5.38262 16.4311C5.26061 16.4835 5.12939 16.5111 4.99661 16.5123C4.86384 16.5134 4.73216 16.4881 4.60926 16.4378C4.48636 16.3875 4.37471 16.3133 4.28082 16.2194C4.18693 16.1255 4.11267 16.0139 4.06239 15.891C4.01211 15.7681 3.98681 15.6364 3.98796 15.5036C3.98912 15.3708 4.0167 15.2396 4.06911 15.1176C4.12152 14.9956 4.1977 14.8853 4.29321 14.793L8.58621 10.5L4.29321 6.207C4.10574 6.01948 4.00043 5.76517 4.00043 5.5C4.00043 5.23484 4.10574 4.98053 4.29321 4.793Z"
      />
      <rect x="15" y="16.5" width="2" height="12" rx="1" transform="rotate(180 15 16.5)" />
    </svg>
  );
};
