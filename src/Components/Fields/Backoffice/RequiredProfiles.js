import React, { useState, useRef } from 'react';
import cross from '../../../Images/Icons/cross-dark.svg';

const ProfilesAdder = ({ profiles, setProfiles }) => {
    const [newProfile, setNewProfile] = useState('');
    const containerRef = useRef(null);

    const addProfile = (e) => {
        e.preventDefault()
        if (newProfile.trim() !== '') {
            setProfiles([...profiles, { text: newProfile }]);
            setNewProfile('');
        }
    };

    const removeProfile = (profile) => {
        setProfiles(profiles.filter(p => p.text !== profile.text));
    };

    return (
        <div ref={containerRef} className="profiles-adder w-2/3 relative">
            <div className="selected-profiles w-full flex flex-col gap-2">
                <div className="flex gap-x-2">
                    <input
                        type="text"
                        value={newProfile}
                        onChange={(e) => setNewProfile(e.target.value)}
                        className="px-4 py-2 border w-full"
                        placeholder="Ajouter un profil"
                    />
                    <button onClick={addProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Ajouter
                    </button>
                </div>
                <div className='flex flex-col flex-wrap gap-y-4 mt-2'>
                    {profiles.map((profile, index) => (
                        <div key={index} className="profile-item text-grey-dark font-medium border border-blue-600 text-white rounded relative w-fit flex items-center">
                            <span className='px-2 py-1 border-e border-blue-dark'>{profile.text}</span>
                            <span
                                onClick={() => removeProfile(profile)}
                                className="px-2 cursor-pointer"
                            >
                                <img src={cross} className='w-2 h-2'/>
                            </span>
                            <input type="hidden" name="required_profiles[]" value={profile.text} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilesAdder;
