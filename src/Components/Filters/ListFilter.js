import React, { useState } from 'react';

const ListFilter = ({ title, options, setter, current }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 bloc--filters">
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
          <li className="mb-2 underline" >
            <label className="flex items-center" >
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={!current}
                onChange={e => (setter(null))}
              /><span className="ml-2">Tous</span>
            </label>
          </li>
          {options.map((subItem, index) =>
          (<li key={(subItem.name || subItem) + index} className="mb-2" >
            <label className="flex items-center" >
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                value={subItem.id || subItem}

                checked={current == (subItem.id || subItem)}
                onChange={e => (setter(e.target.value))}
              />
              <span className="ml-2">{subItem.name || subItem}</span>
            </label>
          </li>)
          )}
        </ul>
      </div >
    </div >
  );
};

export default ListFilter;
