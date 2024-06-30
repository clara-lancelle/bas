import React, { useState, useEffect, useRef } from 'react';

const JobProfilesAdder = ({ selectedProfiles, setSelectedProfiles }) => {
    const { REACT_APP_API_URL } = process.env;
    const [availableJobProfiles, setAvailableJobProfiles] = useState([]);
    const [showJobProfileList, setShowJobProfileList] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/job_profiles`)
            .then(response => response.json())
            .then(data => setAvailableJobProfiles(data['hydra:member'] || []))
            .catch(error => console.error('Error fetching job profiles:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowJobProfileList(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const addJobProfile = (profile) => {
        const updatedSelectedProfiles = [...selectedProfiles, profile];
        setSelectedProfiles(updatedSelectedProfiles);
        setAvailableJobProfiles(availableJobProfiles.filter(p => p.id !== profile.id));
    };

    const removeJobProfile = (profile) => {
        const updatedSelectedProfiles = selectedProfiles.filter(p => p.id !== profile.id);
        setSelectedProfiles(updatedSelectedProfiles);
        setAvailableJobProfiles([...availableJobProfiles, profile]);
    };

    return (
        <div ref={containerRef} className="job-profiles-adder relative">
            <div className="selected-job-profiles flex flex-col gap-2">
                <div
                    className="add-job-profile bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center w-fit"
                    onClick={() => setShowJobProfileList(!showJobProfileList)}
                >
                    Ajouter <span className="ml-2 text-lg">+</span>
                </div>
                <div className='flex gap-x-4'>
                    {selectedProfiles.map((profile) => (
                        <div key={profile.id} className="job-profile-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
                            {profile.name}
                            <span
                                onClick={() => removeJobProfile(profile)}
                                className="ml-2 cursor-pointer"
                            >
                                &times;
                            </span>
                            <input type="hidden" name="jobProfiles[]" value={profile.id} />
                        </div>
                    ))}
                </div>
            </div>
            {showJobProfileList && availableJobProfiles.length > 0 && (
                <div className="job-profiles-list mt-2 border border-blue-600 rounded p-2 bg-white overflow-y-scroll max-h-48">
                    {availableJobProfiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="job-profile-item p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                            onClick={() => addJobProfile(profile)}
                        >
                            {profile.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobProfilesAdder;

