import React from "react";
import "./index.scss";

interface Props {
  text: string;
}

export const Placeholder: React.FC<Props> = ({ text }) => {
  return (
    <div className="placeholder">
      <img src="/icons/lost-items.svg" alt="Placeholder icon" />
      <p>{text}</p>
    </div>
  );
};
