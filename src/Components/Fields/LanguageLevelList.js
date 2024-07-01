import React, { useState, useEffect, useRef } from 'react';

const LanguageLevel = ({ onLanguagesChange, initialLanguages = [], studentIRI = []}) => {
  const [availableLanguagesNames, setAvailableLanguagesNames] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);
  const [selectedLanguagesIRI, setSelectedLanguagesIRI] = useState(initialLanguages.map(language => language['@id']));
  const [showLanguagesForm, setShowLanguagesForm] = useState(false);
  const [languageLevels, setLanguageLevels] = useState([]);
  const [newLanguages, setNewLanguages] = useState({
    name: '',
    level: '',
    students: studentIRI,
  });
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchLanguagesNames = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${REACT_APP_API_URL}/api/languages/names`);
        if (response.ok) {
          const data = await response.json();
          // Assuming you get an array of language names
          const allLanguages = data['hydra:member'].map(name => ({ name, '@id': `/api/languages/${name}` }));
          setAvailableLanguagesNames(allLanguages.filter(language => !selectedLanguagesIRI.includes(language['@id'])));
        } else {
          console.error('Failed to fetch Languages names');
        }
      } catch (error) {
        console.error('Error fetching Languages names:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguagesNames();
  }, [selectedLanguagesIRI, REACT_APP_API_URL]);

  useEffect(() => {
    const fetchLanguagesLevels = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/api/languages/levels`);
        if (response.ok) {
          const data = await response.json();
          setLanguageLevels(data['hydra:member']);
        } else {
          console.error('Failed to fetch Languages levels');
        }
      } catch (error) {
        console.error('Error fetching Languages levels:', error);
      }
    };

    fetchLanguagesLevels();
  }, [REACT_APP_API_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowLanguagesForm(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAddLanguage = () => {
    if (newLanguages.name && newLanguages.level) {
      const languageNameObj = availableLanguagesNames.find(lang => lang['@id'] === newLanguages.name);
      const updatedSelectedLanguage = [...selectedLanguages, { name: languageNameObj.name, level: newLanguages.level, student: studentIRI }];
      const updatedSelectedLanguagesIRI = [...selectedLanguagesIRI, newLanguages.name];
      setSelectedLanguages(updatedSelectedLanguage);
      setSelectedLanguagesIRI(updatedSelectedLanguagesIRI);
      setNewLanguages({ name: '', level: '', students: ''});
      setAvailableLanguagesNames(availableLanguagesNames.filter(lang => lang['@id'] !== newLanguages.name));
      setShowLanguagesForm(false);
      onLanguagesChange(updatedSelectedLanguage);
    }
  };

  const handleRemoveLanguage = (language) => {
    const updatedSelectedLanguages = selectedLanguages.filter(lang => lang.name !== language.name);
    const updatedSelectedLanguagesIRI = selectedLanguagesIRI.filter(id => id !== language['@id']);
    setSelectedLanguages(updatedSelectedLanguages);
    setSelectedLanguagesIRI(updatedSelectedLanguagesIRI);
    setAvailableLanguagesNames([...availableLanguagesNames, { '@id': language['@id'], name: language.name }]);
    onLanguagesChange(updatedSelectedLanguagesIRI);
  };

  return (
    <div ref={containerRef} className="languages-adder relative">
      <div className="selected-languages flex flex-wrap gap-2">
        {selectedLanguages.map((language, index) => (
          <div key={index} className="language-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
            {language.name} ({language.level})
            <span
              onClick={() => handleRemoveLanguage(language)}
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
            <input type="hidden" name="languages[]" value={language['@id']} />
          </div>
        ))}
        <div
          className="add-language bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center"
          onClick={() => setShowLanguagesForm(!showLanguagesForm)}
        >
          Ajouter <span className="ml-2 text-lg">+</span>
        </div>
      </div>
      {showLanguagesForm && (
        <div className="experience-form w-full mt-2 border border-blue-600 rounded p-4 bg-white">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Langue</label>
            <select
              value={newLanguages.name}
              onChange={(e) => setNewLanguages({ ...newLanguages, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2 max-h-48 overflow-y-scroll"
            >
              <option value="">Sélectionner</option>
              {availableLanguagesNames.map((language, index) => (
                <option key={index} value={language['@id']}>{language.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Niveau</label>
            <select
              value={newLanguages.level}
              onChange={(e) => setNewLanguages({ ...newLanguages, level: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2 max-h-48 overflow-y-scroll"
            >
              <option value="">Sélectionner</option>
              {languageLevels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddLanguage}
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ajouter la langue
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageLevel;
