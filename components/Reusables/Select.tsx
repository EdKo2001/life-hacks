import React, { FC } from "react";

interface SelectProps {
  onChange: () => void;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  className?: string;
}

const Select: FC<SelectProps> = ({
  onChange,
  name,
  value,
  options,
  className,
}) => {
  return (
    <div className="custom-select-wrapper">
      <select
        className={`custom-select ${className ? className : ""} `}
        onChange={onChange}
        name={name}
        value={value}
      >
        {options.map((option, idx) => (
          <option value={option.value} key={`option-${idx}`}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
