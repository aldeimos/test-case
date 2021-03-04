import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./index.scss";
import "react-day-picker/lib/style.css";

const min = new Date("1800-01-01").getTime();

interface Props {
  value: Date | undefined;
  labelText: string;
  onChange: (value: Date, field: string) => void;
  name: string;
}

export const DatePicker: React.FC<Props> = ({
  value,
  labelText,
  onChange,
  name,
}) => {
  const handleChangeDate = (value: any) => {

    if (value) {
      if (value.getTime() > min) {
        return onChange(value, name);
      }
      return onChange(new Date("1800-01-01"), name);
    }
  };
  return (
    <div className="day-picker">
      <label>{labelText}</label>
      <DayPickerInput
        onDayChange={handleChangeDate}
        value={value}
        classNames={{
          container: "day-picker__wrapper",
          overlayWrapper: "",
          overlay: "",
        }}
      />
    </div>
  );
};
