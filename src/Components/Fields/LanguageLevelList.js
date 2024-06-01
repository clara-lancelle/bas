import React, { useState, useEffect, useRef } from 'react';

const LanguageLevel = ({ onLanguagesChange }) => {
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLanguagesValue, setSelectedLanguagesValue] = useState([]);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const tempLanguages = [{name: 'Anglais', value: 'anglais'},  {name: 'Français', value: 'français'},  {name: 'Espagnol', value: 'espagnol'},  {name: 'Allemand', value: 'allemand'},   {name: 'Italien', value: 'italien'}];


     // Lorsque l'API sera disponible, remplace par:
    // fetch('{REACT_API_URL}/api/languages')
    //   .then(response => response.json())
    //   .then(data => setAvailableLanguages(data))
    //   .catch(error => console.error('Error fetching languages:', error));

    setAvailableLanguages(tempLanguages);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowLanguageList(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  const addLanguage = (language) => {
    const updatedSelectedLanguages = [...selectedLanguages, language];
    setSelectedLanguages(updatedSelectedLanguages);
    setAvailableLanguages(availableLanguages.filter(lang => lang !== language));
    // onLanguagesChange(updatedSelectedLanguages);
  };

  const addLanguageReturn = (languageValue) => {
    const updatedSelectedLanguagesValue = [...selectedLanguagesValue, languageValue];
    setSelectedLanguagesValue(updatedSelectedLanguagesValue);
    console.log(updatedSelectedLanguagesValue);
    onLanguagesChange(updatedSelectedLanguagesValue);

  }

  const removeLanguage = (language) => {
    const updatedSelectedLanguages = selectedLanguages.filter(lang => lang !== language);
    setSelectedLanguages(updatedSelectedLanguages);
    setAvailableLanguages([...availableLanguages, language]);
    // onLanguagesChange(updatedSelectedLanguages);
  };
  
  const removeLanguageReturn = (languageValue) => {
    const updatedSelectedLanguagesValue = selectedLanguagesValue.filter(lang => lang !== languageValue);
    setSelectedLanguagesValue(updatedSelectedLanguagesValue);
    onLanguagesChange(updatedSelectedLanguagesValue);
  }

  return (
    <div ref={containerRef} className="languages-adder relative">
      <div className="selected-languages flex flex-wrap gap-2">
        {selectedLanguages.map((language, index) => (
          <div key={index} className="language-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
            {language.name}
            <span 
              onClick={() => removeLanguage(language)} 
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
            <input type="hidden" name="languages[]" value={language} />
          </div>
        ))}
        <div 
          className="add-language bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center"
          onClick={() => setShowLanguageList(!showLanguageList)}
        >
          Ajouter <span className="ml-2 text-lg">+</span>
        </div>
      </div>
      {showLanguageList && (
        <div className="languages-list mt-2 border border-blue-600 rounded p-2 bg-white">
          {availableLanguages.map((language, index) => (
            <div 
              key={index} 
              className="language-item p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
              onClick={() => (addLanguage(language), addLanguageReturn(language.value))} 
            >
              {language.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageLevel;
