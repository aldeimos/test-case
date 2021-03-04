import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./index.scss";

interface Props {
  to: string;
  children: JSX.Element | JSX.Element[] | String;
  template?: string;
}

export const Link: React.FC<Props> = ({
  to,
  children,
  template = "default",
}) => {
  return (
    <RouterLink to={to} className={`link link__${template}`}>
      {children}
    </RouterLink>
  );
};
