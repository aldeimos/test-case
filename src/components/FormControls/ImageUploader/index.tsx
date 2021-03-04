import React, { useState } from "react";
import { ControlledComponent } from "../../../types/controlledComponent";
import "./index.scss";

export const ImageUploader: React.FC<ControlledComponent> = ({
  labelText,
  value,
  name,
  onChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    setIsLoading(true);
    reader.onloadend = async () => {
      const blob = reader.result;
      onChange(blob as string, name);
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="image-uploader">
      <input
        className="image-uploader__input"
        type="file"
        name={name}
        onChange={handleUpload}
        id={name}
      />
      <label
        htmlFor={name}
        className="image-uploader__label"
        aria-label={labelText}
      >
        {value && <img src={value as string} alt="Book cover preview" />}
      </label>
    </div>
  );
};
