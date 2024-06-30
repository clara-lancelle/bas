import React, { useState, useRef } from 'react';
import cross from '../../../Images/Icons/cross-dark.svg'

const MissionsAdder = ({ missions, setMissions }) => {
    const [newMission, setNewMission] = useState('');
    const containerRef = useRef(null);

    const addMission = (e) => {
        e.preventDefault();
        if (newMission.trim() !== '') {
            setMissions([...missions, { text: newMission }]);
            setNewMission('');
        }
    };

    const removeMission = (mission) => {
        setMissions(missions.filter(m => m.text !== mission.text));
    };

    return (
        <div ref={containerRef} className="missions-adder w-2/3 relative">
            <div className="selected-missions w-full flex flex-col gap-2">
                <div className="flex gap-x-2">
                    <input
                        type="text"
                        value={newMission}
                        onChange={(e) => setNewMission(e.target.value)}
                        className="px-4 py-2 border w-full"
                        placeholder="Ajouter une mission"
                    />
                    <button onClick={addMission} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Ajouter
                    </button>
                </div>
                <div className='flex flex-col flex-wrap gap-y-4 mt-2'>
                    {missions.map((mission, index) => (
                        <div key={index} className="mission-item text-grey-dark font-medium border border-blue-600 text-white  rounded relative w-fit flex items-center">
                            <span className='px-2 py-1 border-e border-blue-dark'>{mission.text}</span>
                            <span
                                onClick={() => removeMission(mission)}
                                className="px-2 cursor-pointer"
                            >
                                <img src={cross} className='w-2 h-2 '/>
                            </span>
                            <input type="hidden" name="missions[]" value={mission.text} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MissionsAdder;
