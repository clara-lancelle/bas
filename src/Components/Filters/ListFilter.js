import React, { useState, useEffect } from 'react';
import Checkbox from '../Fields/Checkbox';

const ListFilter = ({ title, options, setter, current = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (current.length === 0) {
      setter([]);
    }
  }, [setter]);

  const handleOptionChange = (value, event) => {
    if (value === 'Tous' && (current.includes('Tous') || current.length == 0)) {
      return; 
    }

    let newCurrent;
    if (value === 'Tous') {
      setter(current.includes('Tous') ? [] : ['Tous']);
    } else {

      newCurrent = current.includes(value)
        // ? [current.filter(item => item !== value)]
        ? []
        : [value];
      
      if (newCurrent.length === 0) {
        newCurrent = [];
      }
      setter(newCurrent);
    }
  };

  const isAllChecked = (current.length == 0 || current.includes('Tous'));

  return (
    <div className="mb-4 bloc--filters">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleSection}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <ul className="mt-4">
          <li className="mb-2 underline">
            <Checkbox
              label={'Tous'}
              checked={isAllChecked}
              onChange={(event) => handleOptionChange('Tous', event)}
            />
          </li>
          {options.map((subItem, index) => (
            <li key={(subItem.name || subItem) + index} className="mb-2">
              <label className="flex items-center">
                <Checkbox
                  label={subItem.name || subItem}
                  checked={current.includes(subItem.id || subItem)}
                  activeCheckEvent={true}
                  value={subItem.id || subItem}
                  onChange={() => handleOptionChange(subItem.id || subItem)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListFilter;
