import React from "react";
import { ControlledComponent } from "../../../types/controlledComponent";

type Props = {
  min?: number;
  max?: number;
  step?: number;
} & ControlledComponent;

export const NumberInput: React.FC<Props> = ({
  name,
  labelText,
  value,
  onChange,
  placeholder,
  min,
  max,
  step = 1,
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name);
  };

  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
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
