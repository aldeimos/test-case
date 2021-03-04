import React from "react";
import "./index.scss";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  children?: JSX.Element | JSX.Element[] | String;
  template?: string;
  onClick?: (val: any) => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  type = "button",
  children,
  template = "default",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`button button__${template}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
