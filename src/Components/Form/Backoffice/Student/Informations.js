import React, { useState } from "react";

export default function StudentInformationsForm({ formData, setFormData, toggleEditState, notify, userId }) {
    const { REACT_APP_API_URL } = process.env;
    const [newFormData, setNewFormData] = useState([]);
    const userToken = sessionStorage.getItem('token')


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setNewFormData((newFormData) => ({
            ...newFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendDataToAPI(newFormData);
        await updateFormData(newFormData)
        notify('Votre informations ont été mises à jour !', 'success');
        toggleEditState('informations');
    };

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const sendDataToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/students/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des informations complémentaires', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="flex flex-col flex-wrap justify-between items-start px-8 py-6" onSubmit={handleSubmit}>
            <div className="flex justify-between items-start gap-x-16">
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Handicap : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="handicap" defaultChecked={formData.handicap} onChange={handleChange} type="checkbox" />
                    </label>
                    <label>
                        <span className="font-semibold">Permis de conduire : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="driver_license" defaultChecked={formData.driver_license} onChange={handleChange} type="checkbox" />
                    </label>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">LinkedIn : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="linkedin_page" defaultValue={formData.linkedin_page} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Lien personnel : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="personnal_website" defaultValue={formData.personnal_website} onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end mt-4">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    );
}
