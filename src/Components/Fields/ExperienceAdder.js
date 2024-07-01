import React, { useState, useRef, useEffect } from 'react';

const ExperienceAdder = ({ name, onExperiencesChange }) => {
  const { REACT_APP_API_URL } = process.env;
  const [availableExperiences, setAvailableExperiences] = useState([
    // 'Stage', 'Alternance', 'CDI', 'CDD', 'Freelance', 'Projet personnel'
  ]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    type: '',
    company: '',
    year: ''
  });
  const containerRef = useRef(null);

  useEffect(() => {

    fetch(`${REACT_APP_API_URL}/api/experiences/types`)
      .then(response => response.json())
      .then(data => setAvailableExperiences(data['hydra:member']))
      .catch(error => console.error('Error fetching skills:', error));

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowExperienceForm(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAddExperience = () => {
    if (newExperience.type && newExperience.company && newExperience.year) {
      const updatedSelectedExperiences = [...selectedExperiences, { ...newExperience }];
      setSelectedExperiences(updatedSelectedExperiences);
      setNewExperience({ type: '', company: '', year: '' });
      setShowExperienceForm(false);
      onExperiencesChange(updatedSelectedExperiences);
    }
  };

  const removeExperience = (index) => {
    const updatedSelectedExperiences = selectedExperiences.filter((_, i) => i !== index);
    setSelectedExperiences(updatedSelectedExperiences);
    onExperiencesChange(updatedSelectedExperiences);
  };

  return (
    <div ref={containerRef} className="experience-adder">
      <div className="selected-experiences flex flex-wrap gap-2 mb-2">
        {selectedExperiences.map((experience, index) => (
          <div key={index} className="experience-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
            {`${experience.type} : ${experience.company} (${experience.year})`}
            <span 
              onClick={() => removeExperience(index)} 
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
            <input type="hidden" name={name} value={`${experience.type} : ${experience.company} (${experience.year})`} />
          </div>
        ))}
        <div 
          className="add-experience bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center"
          onClick={() => setShowExperienceForm(!showExperienceForm)}
        >
          Ajouter <span className="ml-2 text-lg">+</span>
        </div>
      </div>
      {showExperienceForm && (
        <div className="experience-form mt-2 border border-blue-600 rounded p-4 bg-white">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type d'expérience</label>
            <select
              value={newExperience.type}
              onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
            >
              <option value="">Sélectionner</option>
              {availableExperiences.map((experience, index) => (
                <option key={index} value={experience}>{experience}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Année</label>
            <input
              value={newExperience.year}
              type="number" 
              min="1950" 
              max="2025 "
              onChange={(e) => setNewExperience({ ...newExperience, year: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
            />
          </div>
          <button 
            onClick={handleAddExperience}
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ajouter l'expérience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceAdder;
