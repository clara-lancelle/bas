import React, { useEffect, useState, useRef } from "react";
import moment from "moment";

export default function CompanyInformationsForm({ formData, setFormData, toggleEditState }) {
    const { REACT_APP_API_URL } = process.env;
    const [activities, setActivities] = useState([]);
    const [availableActivities, setAvailableActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedActivitiesIRI, setSelectedActivitiesIRI] = useState([])
    const [showActivitiesList, setShowActivitiesList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newFormData, setNewFormData] = useState({});
    const containerRef = useRef(null);
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId') 

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/company_activities`);
                if (response.ok) {
                    const data = await response.json();
                    const activitiesData = data['hydra:member'];
                    setActivities(activitiesData);
                    setAvailableActivities(activitiesData);
                } else {
                    console.error('Failed to fetch activities');
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        setLoading(true)
        fetchActivities();
        setLoading(false)
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewFormData((newFormData) => ({
            ...newFormData,
            [name]: name === 'activities' ? [...event.target.selectedOptions].map(option => activities.find(act => act['@id'] === option.value)) : value

        }));
    };

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newFormData.activities) {
            const newFormInformationsData = {
                ...newFormData,
                activities: newFormData.activities.map(activity => activity['@id'])
            };
            await sendDataToAPI(newFormInformationsData);
        }else{
            await sendDataToAPI(newFormData);
        }

        await updateFormData(newFormData)

        toggleEditState('informations');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowActivitiesList(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const addActivity = (activity) => {
        const updatedSelectedActivitiesIRI = [...selectedActivitiesIRI, activity['@id']];
        const updatedSelectedActivities = [...selectedActivities, activity];
        setSelectedActivitiesIRI(updatedSelectedActivitiesIRI);
        setSelectedActivities(updatedSelectedActivities);
        setAvailableActivities(availableActivities.filter(s => s !== activity));
        setNewFormData((newFormData) => ({
            ...newFormData,
            ['activities']: updatedSelectedActivities,
        }));
    };

    const removeActivity = (activity) => {
        const updatedSelectedActivitiesIRI = selectedActivitiesIRI.filter(s => s !== activity['@id']);
        const updatedSelectedActivities = selectedActivities.filter(s => s !== activity);
        setSelectedActivitiesIRI(updatedSelectedActivitiesIRI);
        setSelectedActivities(updatedSelectedActivities);
        setAvailableActivities([...availableActivities, activity]);
        setFormData((formData) => ({
            ...formData,
            ['activities']: updatedSelectedActivities,
        }));
    };

    const sendDataToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/companies/${userCompanyId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des informations de l\'entreprise.', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="w-full flex flex-col gap-y-6 px-4 py-6" onSubmit={handleSubmit}>
            <div className="flex items-start gap-x-16">
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Date de création : </span>
                        <input type="date" name="creation_date" className="border-b py-1 ps-2 ms-2" defaultValue={moment(formData.creation_date).format('YYYY-MM-DD')} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Effectif : </span>
                        <input type="text" className="border-b py-1 ps-2 ms-2" name="workforce" defaultValue={formData.workforce} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Secteur d'activité : </span>
                        <div ref={containerRef} className="skills-adder relative">

                            <div className="selected-skills flex flex-wrap gap-2">
                                {selectedActivities.map((activity, index) => (
                                    <div key={index} className="skill-item bg-blue-600 text-white px-2 py-1 rounded relative flex items-center">
                                        {activity.name}
                                        <span
                                            onClick={() => removeActivity(activity)}
                                            className="ml-2 cursor-pointer"
                                        >
                                            &times;
                                        </span>
                                        <input type="hidden" name="activities[]" value={activity.id} />
                                    </div>
                                ))}
                                <div
                                    className="add-skill bg-blue-100 text-blue-600 px-2 py-1 rounded cursor-pointer flex items-center"
                                    onClick={() => setShowActivitiesList(!showActivitiesList)}
                                >
                                    Ajouter <span className="ml-2 text-lg">+</span>
                                </div>
                            </div>
                            {showActivitiesList && (
                                <div className="skills-list mt-2 border border-blue-600 rounded p-2 bg-white overflow-y-scroll max-h-[200px]">
                                    {availableActivities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="skill-item p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                                            onClick={() => addActivity(activity)}
                                        >
                                            {activity.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                    <label>
                        <span className="font-semibold">Chiffre d'affaire : </span>
                        <input type="text" className="border-b py-1 ps-2 ms-2" name="revenue" defaultValue={formData.revenue} onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    )
}