import React from "react";
import { ControlledComponent } from "../../../types/controlledComponent";
import "./index.scss";

interface Props extends ControlledComponent {
  max: number;
}

export const TextInput: React.FC<Props> = ({
  labelText,
  value,
  onChange,
  name,
  placeholder,
  disabled,
  max,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value.length > max) {
      return;
    }

    onChange(e.target.value, name);
  };

  return (
    <div className="text-input">
      <label htmlFor={name}>{labelText}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
