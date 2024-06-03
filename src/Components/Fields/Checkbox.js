import React, { useState, useEffect } from 'react';
import checkboxChecked from "../../Images/Icons/checkbox-checked.svg";
const Checkbox = ({ label, checked, name, value, activeCheckEvent, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    if(activeCheckEvent) {
      setIsChecked(!isChecked)
    }
    onChange(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
        className="hidden" 
        name={name? name : ''}
        value={value? value : ''}
      />
      <div className={`w-6 h-6 flex items-center justify-center rounded bg-blue-600 ${isChecked ? 'bg-blue-600' : 'bg-gray-200'}`}>
        {isChecked && (
          <img src={checkboxChecked} />
        )}
      </div>
      {label && <span className="ml-[10px] opacity-70">{label}</span>}
    </label>
  );
};

export default Checkbox;
