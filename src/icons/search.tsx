import * as React from 'react';

interface myProps {
  color: string;
  onClick?: () => void;
}

export const Search: React.FC<myProps> = ({ color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="28"
      height="28"
      viewBox="0 0 21 21"
      fill={color === 'light' ? '#406882' : '#ECEDF3'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2.00077C4.93913 2.00077 3.92172 2.42219 3.17157 3.17234C2.42143 3.92248 2 4.9399 2 6.00077C2 7.06163 2.42143 8.07905 3.17157 8.82919C3.92172 9.57934 4.93913 10.0008 6 10.0008C7.06087 10.0008 8.07828 9.57934 8.82843 8.82919C9.57857 8.07905 10 7.06163 10 6.00077C10 4.9399 9.57857 3.92248 8.82843 3.17234C8.07828 2.42219 7.06087 2.00077 6 2.00077ZM1.13461e-07 6.00077C-0.00012039 5.05647 0.222642 4.12548 0.650171 3.28351C1.0777 2.44154 1.69792 1.71236 2.4604 1.15529C3.22287 0.598219 4.10606 0.228978 5.03815 0.0775993C5.97023 -0.0737798 6.92488 -0.00302249 7.82446 0.284117C8.72404 0.571256 9.54315 1.06667 10.2152 1.73006C10.8872 2.39346 11.3931 3.2061 11.6919 4.1019C11.9906 4.9977 12.0737 5.95136 11.9343 6.88532C11.795 7.81928 11.4372 8.70716 10.89 9.47677L15.707 14.2938C15.8892 14.4824 15.99 14.735 15.9877 14.9972C15.9854 15.2594 15.8802 15.5102 15.6948 15.6956C15.5094 15.881 15.2586 15.9862 14.9964 15.9884C14.7342 15.9907 14.4816 15.8899 14.293 15.7078L9.477 10.8918C8.57936 11.53 7.52335 11.9089 6.42468 11.9869C5.326 12.0648 4.22707 11.8389 3.2483 11.3337C2.26953 10.8286 1.44869 10.0638 0.875723 9.12312C0.30276 8.18244 -0.000214051 7.1022 1.13461e-07 6.00077Z"
      />
    </svg>
  );
};
