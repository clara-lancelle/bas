import React, { useState, useEffect, useRef } from 'react';

const SkillsAdder = ({ selectedSkills, setSelectedSkills }) => {
    const { REACT_APP_API_URL } = process.env;
    const [availableSkills, setAvailableSkills] = useState([]);
    const [showSkillList, setShowSkillList] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/skills`)
            .then(response => response.json())
            .then(data => data['hydra:member'])
            .then(data => setAvailableSkills(data))
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
        const updatedSelectedSkills = [...selectedSkills, skill];
        setSelectedSkills(updatedSelectedSkills);
        setAvailableSkills(availableSkills.filter(s => s.id !== skill.id));
    };

    const removeSkill = (skill) => {
        const updatedSelectedSkills = selectedSkills.filter(s => s.id !== skill.id);
        setSelectedSkills(updatedSelectedSkills);
        setAvailableSkills([...availableSkills, skill]);
    };

    return (
        <div ref={containerRef} className="skills-adder relative">
            <div className="selected-skills flex flex-col gap-2">
                <div
                    className="add-skill bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center w-fit"
                    onClick={() => setShowSkillList(!showSkillList)}
                >
                    Ajouter <span className="ml-2 text-lg">+</span>
                </div>
                <div className='flex flex-wrap gap-x-4'>
                    {selectedSkills.map((skill) => (
                        <div key={skill.id} className="skill-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
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
                </div>
            </div>
            {showSkillList && availableSkills && (
                <div className="skills-list mt-2 border border-blue-600 rounded p-2 bg-white overflow-y-scroll max-h-48">
                    {Array.isArray(availableSkills) && availableSkills.map((skill) => (
                        <div
                            key={skill.id}
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
