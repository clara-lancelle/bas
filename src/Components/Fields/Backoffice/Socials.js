import React, { useState, useRef, useEffect } from 'react';

const SocialsField = ({ onSocialsChange, socials, initialSelectedSocials, prepareInitialSelectedSocials }) => {
    const [availableSocials, setAvailableSocials] = useState([]);
    const [selectedSocials, setSelectedSocials] = useState([]);
    const [showSocialsForm, setShowSocialsForm] = useState(false);
    const [newSocials, setNewSocials] = useState({
        socialNetwork: '',
        url: '',
        socialName: '',
    });
    const containerRef = useRef(null);
    useEffect(() => {
        if (initialSelectedSocials) {
            setSelectedSocials(initialSelectedSocials);
            onSocialsChange(initialSelectedSocials);
        }
    }, [initialSelectedSocials]);

    useEffect(() => {
        const filteredAvailableSocials = socials.filter(social =>
            !selectedSocials.some(selected => selected.socialNetwork === social['@id'])
        );
        setAvailableSocials(filteredAvailableSocials);
    }, [socials, selectedSocials]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSocialsForm(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAddSocial = () => {
        if (newSocials.socialNetwork && newSocials.url) {
            const updatedSelectedSocials = [...selectedSocials, { ...newSocials }];
            setSelectedSocials(updatedSelectedSocials);

            const updatedAvailableSocials = availableSocials.filter(
                (social) => social['@id'] !== newSocials.socialNetwork
            );
            setAvailableSocials(updatedAvailableSocials);

            setNewSocials({ socialNetwork: '', url: '', socialName: '' });
            setShowSocialsForm(false);
            onSocialsChange(updatedSelectedSocials);
        }
    };

    const removeSocial = (index) => {
        const removedSocial = selectedSocials[index];
        const updatedSelectedSocials = selectedSocials.filter((_, i) => i !== index);
        setSelectedSocials(updatedSelectedSocials);

        const updatedAvailableSocials = [...availableSocials, { name: removedSocial.socialName, '@id': removedSocial.socialNetwork }];
        setAvailableSocials(updatedAvailableSocials);

        onSocialsChange(updatedSelectedSocials);
    };

    const handleSocialNetworkChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setNewSocials({
            ...newSocials,
            socialNetwork: e.target.value,
            socialName: selectedOption.getAttribute('data-name'),
        });
    };

    return (
        <div ref={containerRef} className="experience-adder">
            <div className="selected-experiences flex flex-col flex-wrap gap-2 mb-2">
                {selectedSocials.map((social, index) => (
                    <div key={index} className="experience-item bg-blue-600 text-white px-2 py-1 rounded relative w-fit flex items-center">
                        {`${social.socialName} : ${social.url}`}
                        <span
                            onClick={() => removeSocial(index)}
                            className="ml-2 cursor-pointer"
                        >
                            &times;
                        </span>
                        {/* <input type="hidden" name={'socialNetwork'} value={`${social.socialNetwork} : ${social.url}`} /> */}
                        <input type="hidden" name="socialNetwork" value={social.socialNetwork} />
                        <input type="hidden" name="url" value={social.url} />
                        <input type="hidden" name="socialName" value={social.socialName} />
                    </div>
                ))}
                <div
                    className="add-experience bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer w-fit flex items-center"
                    onClick={() => setShowSocialsForm(!showSocialsForm)}
                >
                    Ajouter <span className="ml-2 text-lg">+</span>
                </div>
            </div>
            {showSocialsForm && (
                <div className="experience-form mt-2 border border-blue-600 rounded p-4 bg-white">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Réseau social</label>
                        <select
                            value={newSocials.socialNetwork}
                            onChange={handleSocialNetworkChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
                        >
                            <option value="" hidden>Sélectionner</option>
                            {availableSocials.map((social, index) => (
                                <option key={index} value={social['@id']} data-name={social.name}>{social.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="text"
                            value={newSocials.url}
                            onChange={(e) => setNewSocials({ ...newSocials, url: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b p-2"
                        />
                    </div>
                    <button
                        onClick={handleAddSocial}
                        className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ajouter le réseau
                    </button>
                </div>
            )}
        </div>
    );
};

export default SocialsField;
