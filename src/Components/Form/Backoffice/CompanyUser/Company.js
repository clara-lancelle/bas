import React, { useState, useEffect } from "react";

export default function CompanyUserCompanyForm({ formData, setFormData, toggleEditState, notify, companyName }) {
    const { REACT_APP_API_URL } = process.env;
    const [genders, setGenders] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const userToken = sessionStorage.getItem('token')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewFormData((newFormData) => ({
            ...newFormData,
            [name]: value,

        }));
    };

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const validateFormData = () => {
        const newErrors = {};
        const phoneRegex = /^0\d{9}$/;
        if ('position' in newFormData && newFormData.position.trim() === '') newErrors.position = "Le poste est requis.";
        if ('officePhone' in newFormData && newFormData.officePhone !== '' && !phoneRegex.test(newFormData.officePhone)) newErrors.officePhone = "Téléphone invalide.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            await sendDataToAPI(newFormData);
            await updateFormData(newFormData);
            notify('Vos informations d\'entreprise ont été mises à jour !', 'success');
            toggleEditState('company');
        } else {
            notify('Vérifiez vos champs', 'error');
        };
    }

    const sendDataToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/company_users/${formData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des informations', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="w-full flex flex-col gap-y-8 px-4 py-6" onSubmit={handleSubmit}>
            <div className="w-full flex items-start gap-x-16">
                <div className="flex flex-col gap-y-4">
                    <p><span className="font-semibold">Entreprise : </span>{companyName || 'Non renseigné'}</p>
                    <label>
                        <span className="font-semibold">Poste : </span>
                        <input type="text" name="position" defaultValue={formData.position} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.position && <p className="text-red-500">{errors.position}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input type="phone" name="officePhone" defaultValue={formData.officePhone} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.officePhone && <p className="text-red-500">{errors.officePhone}</p>}
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form >
    )
}