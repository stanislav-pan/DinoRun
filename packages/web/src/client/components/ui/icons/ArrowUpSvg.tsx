import React, { ReactElement } from "react";

interface Props {
  color?: string;
  className?: string;
}

export const ArrowDownSvg = ({ color, className }: Props): ReactElement => {
  return (
    <svg
      className={className}
      width="26"
      height="15"
      viewBox="0 0 26 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4399 14.4792L0.521172 3.56012C-0.173748 2.86554 -0.173748 1.73939 0.521172 1.04514C1.21547 0.350837 2.34156 0.350837 3.03581 1.04514L12.6972 10.7068L22.3582 1.04542C23.0528 0.351119 24.1788 0.351119 24.8731 1.04542C25.5677 1.73973 25.5677 2.86582 24.8731 3.5604L13.9542 14.4795C13.6069 14.8266 13.1522 15 12.6973 15C12.2421 15 11.787 14.8263 11.4399 14.4792Z"
        fill={color || "black"}
      />
    </svg>
  );
};
