import React, { useState, useEffect, useRef } from 'react';

const SkillsAdder = ({ onSkillsChange }) => {
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillList, setShowSkillList] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const containerRef = useRef(null);

  useEffect(() => {
    // Compétences temporaires
    // const tempSkills = [{name: 'Réseaux sociaux', value: 'socialMedia'},  {name: 'Canva', value: 'canva'},  {name: 'Swello', value: 'swello'},  {name: 'Photoshop', value: 'photoshop'},   {name: 'Illustrator', value: 'illustrator'}];
    // setAvailableSkills(tempSkills);

    fetch(`${REACT_APP_API_URL}/api/skills`)
      .then(response => response.json())
      .then(data => setAvailableSkills(data['hydra:member']))
      .catch(error => console.error('Error fetching skills:', error));
      
  }, []);

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
    const updatedSelectedSkills = [...selectedSkills, {name: skill.name, id: skill['@id']}];
    setSelectedSkills(updatedSelectedSkills);
    setAvailableSkills(availableSkills.filter(s => s !== skill));
    onSkillsChange(updatedSelectedSkills);
  };

  const removeSkill = (skill) => {
    const updatedSelectedSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(updatedSelectedSkills);
    setAvailableSkills([...availableSkills, skill]);
    onSkillsChange(updatedSelectedSkills);
  };
    return (
    <div ref={containerRef} className="skills-adder relative">
      <div className="selected-skills flex flex-wrap gap-2">
        {selectedSkills.map((skill, index) => (
          <div key={index} className="skill-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
            {skill.name}
            <span 
              onClick={() => removeSkill(skill.name)} 
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
            <input type="hidden" name="skills[]" value={skill.name} />
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
        <div className="skills-list mt-2 border border-blue-600 rounded p-2 bg-white">
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
