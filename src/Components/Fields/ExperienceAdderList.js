import React, { useState, useRef, useEffect } from 'react';

const ExperienceAdder = ({ name, onExperiencesChange, initialExperiences = [] }) => {
  const [availableExperiences, setAvailableExperiences] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState(initialExperiences);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    type: '',
    company: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchExperienceTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${REACT_APP_API_URL}/api/experiences/types`);
        if (response.ok) {
          const data = await response.json();
          setAvailableExperiences(data['hydra:member']);
        } else {
          console.error('Failed to fetch experience types');
        }
      } catch (error) {
        console.error('Error fetching experience types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceTypes();
  }, [REACT_APP_API_URL]);

  useEffect(() => {
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
      <div className="selected-experiences flex flex-col gap-2 mb-2">
        {selectedExperiences.length > 0 && (
          <div className='flex flex-col gap-y-2'>
            {selectedExperiences.map((experience, index) => (
              <div key={index} className="experience-item bg-blue-600 text-white px-2 py-1 rounded relative w-fit flex items-center">
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
          </div>
        )}
        <div
          className="add-experience bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer w-fit flex items-center"
          onClick={() => setShowExperienceForm(!showExperienceForm)}
        >
          Ajouter <span className="ml-2 text-lg">+</span>
        </div>
      </div>
      {showExperienceForm && (
        <div className="experience-form w-full mt-2 border border-blue-600 rounded p-4 bg-white">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type d'expérience</label>
            <select
              value={newExperience.type}
              onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
            >
              <option value="">Sélectionner</option>
              {console.log(availableExperiences)}
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
              type="text"
              value={newExperience.year}
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
