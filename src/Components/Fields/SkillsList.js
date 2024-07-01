import React, { useState, useEffect, useRef } from 'react';

const SkillsAdder = ({ onSkillsChange, initialSkills = [] }) => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [selectedSkillsIRI, setSelectedSkillsIRI] = useState(initialSkills.map(skill => skill['@id']));
  const [showSkillList, setShowSkillList] = useState(false);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${REACT_APP_API_URL}/api/skills`);
        if (response.ok) {
          const data = await response.json();
          const allSkills = data['hydra:member'];
          setAvailableSkills(allSkills.filter(skill => !selectedSkillsIRI.includes(skill['@id'])));
        } else {
          console.error('Failed to fetch Skills');
        }
      } catch (error) {
        console.error('Error fetching Skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [selectedSkillsIRI, REACT_APP_API_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSkillList(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const addSkill = (skill) => {
    const updatedSelectedSkills = [...selectedSkills, skill];
    const updatedSelectedSkillsIRI = [...selectedSkillsIRI, skill['@id']];
    setSelectedSkills(updatedSelectedSkills);
    setSelectedSkillsIRI(updatedSelectedSkillsIRI);
    setAvailableSkills(availableSkills.filter(s => s['@id'] !== skill['@id']));
    onSkillsChange(updatedSelectedSkillsIRI);
  };

  const removeSkill = (skill) => {
    const updatedSelectedSkills = selectedSkills.filter(s => s['@id'] !== skill['@id']);
    const updatedSelectedSkillsIRI = selectedSkillsIRI.filter(id => id !== skill['@id']);
    setSelectedSkills(updatedSelectedSkills);
    setSelectedSkillsIRI(updatedSelectedSkillsIRI);
    setAvailableSkills([...availableSkills, skill]);
    onSkillsChange(updatedSelectedSkillsIRI);
  };

  return (
    <div ref={containerRef} className="skills-adder relative">
      <div className="selected-skills flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <div key={index} className="skill-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
            {skill.name}
            <span 
              onClick={() => removeSkill(skill)} 
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
            <input type="hidden" name="skills[]" value={skill['@id']} />
          </div>
        ))}
        <div 
          className="add-skill bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center"
          onClick={() => setShowSkillList(!showSkillList)}
        >
          Ajouter <span className="ml-2 text-lg">+</span>
        </div>
      </div>
      {showSkillList && (
        <div className="skills-list mt-2 border border-blue-600 rounded p-2 max-h-48 overflow-y-scroll bg-white">
          {availableSkills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
              onClick={() => addSkill(skill)} 
            >
              {skill.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsAdder;
