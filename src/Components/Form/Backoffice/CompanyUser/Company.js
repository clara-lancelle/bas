import React, { useState, useEffect } from "react";

export default function CompanyUserCompanyForm({ formData, setFormData, toggleEditState, notify, companyName }) {
    const { REACT_APP_API_URL } = process.env;
    const [genders, setGenders] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
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

    const isModifiedFormDataValid = (formData) => {
        const requiredFields = {
            position: 'Poste',
            officePhone: 'Téléphone professionnel',
        };

        for (let field in formData) {
            if (requiredFields.hasOwnProperty(field)) {
                const value = formData[field];
                if (value === null || value.trim() === '' || (Array.isArray(value) && value.length === 0)) {
                    return {
                        isValid: false,
                        message: `${requiredFields[field]} ne doit pas être vide.`
                    };
                }
    
                if (field === 'officePhone') {
                    const phoneRegex = /^0\d{9}$/;
                    if (!phoneRegex.test(value)) {
                        return {
                            isValid: false,
                            message: `Le numéro de téléphone doit commencer par 0 et contenir exactement 10 chiffres.`
                        };
                    }
                }
            }
        }
        return { isValid: true, message: '' };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { isValid, message } = isModifiedFormDataValid(newFormData);

        if (!isValid) {
            notify(message, 'error');
            return;
        }
        await sendDataToAPI(newFormData);
        await updateFormData(newFormData)
        notify('Vos informations d\'entreprise ont été mises à jour !', 'success');
        toggleEditState('identity');
    };

    const sendDataToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/company_users/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/ld+json',
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
                    </label>
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input type="phone" name="officePhone" defaultValue={formData.officePhone} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form >
    )
}