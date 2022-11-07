import * as React from 'react';

interface myProps {
  color: string;
  onClick?: () => void;
}

export const Download: React.FC<myProps> = ({ color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="28"
      height="28"
      viewBox="0 0 21 21"
      fill={color === 'light' ? '#1A374D' : '#ECEDF3'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V7.414C15.9999 6.88361 15.7891 6.37499 15.414 6L12 2.586C11.625 2.2109 11.1164 2.00011 10.586 2H6ZM11 8C11 7.73478 10.8946 7.48043 10.7071 7.29289C10.5196 7.10536 10.2652 7 10 7C9.73478 7 9.48043 7.10536 9.29289 7.29289C9.10536 7.48043 9 7.73478 9 8V11.586L7.707 10.293C7.61475 10.1975 7.50441 10.1213 7.3824 10.0689C7.2604 10.0165 7.12918 9.9889 6.9964 9.98775C6.86362 9.9866 6.73194 10.0119 6.60905 10.0622C6.48615 10.1125 6.3745 10.1867 6.2806 10.2806C6.18671 10.3745 6.11246 10.4861 6.06218 10.609C6.0119 10.7319 5.9866 10.8636 5.98775 10.9964C5.9889 11.1292 6.01649 11.2604 6.0689 11.3824C6.12131 11.5044 6.19749 11.6148 6.293 11.707L9.293 14.707C9.48053 14.8945 9.73484 14.9998 10 14.9998C10.2652 14.9998 10.5195 14.8945 10.707 14.707L13.707 11.707C13.8892 11.5184 13.99 11.2658 13.9877 11.0036C13.9854 10.7414 13.8802 10.4906 13.6948 10.3052C13.5094 10.1198 13.2586 10.0146 12.9964 10.0123C12.7342 10.01 12.4816 10.1108 12.293 10.293L11 11.586V8Z"
      />
    </svg>
  );
};
