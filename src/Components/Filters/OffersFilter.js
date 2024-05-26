import React, { useState } from 'react';

const OffersFilter = ({ title, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (optionValue) => {
    onChange(title, optionValue);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleSection}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <ul className="mt-4">
          {options.map((option) => (
            <li key={option.value} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                <span className="ml-2">{option.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OffersFilter;
