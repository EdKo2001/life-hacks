import React, { FC } from "react";

interface SwitchProps {
  onChange: (checked: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ onChange }) => {
  return (
    <div className="switch">
      <input
        type="checkbox"
        id="switch"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
};
export default Switch;
