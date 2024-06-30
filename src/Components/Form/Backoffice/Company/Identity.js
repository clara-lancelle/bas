import React, { useState, useEffect } from "react";

export default function CompanyIdentityForm({ formData, setFormData, toggleEditState, notify }) {
    const { REACT_APP_API_URL } = process.env;
    const [categories, setCategories] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId') 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/company_categories`);
                if (response.ok) {
                    const data = await response.json();
                    const categoriesData = data['hydra:member'];
                    setCategories(categoriesData);
                } else {
                    console.error('Failed to fetch Categories');
                }
            } catch (error) {
                console.error('Error fetching Categories:', error);
            }
        };
        setLoading(true)
        fetchCategories();
        setLoading(false)
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewFormData((newFormData) => ({
            ...newFormData,
            [name]: name === 'category' ? categories.find(cat => cat['@id'] === value) : value,

        }));
    };

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const isModifiedFormDataValid = (formData) => {
        const requiredFields = {
            name: 'Nom',
            siret: 'SIRET',
            category: 'Catégorie',
            phone_num: 'Numéro de téléphone',
            address: 'Adresse',
            city: 'Ville',
            zip_code: 'Code postal'
        };

        for (let field in formData) {
            if (requiredFields.hasOwnProperty(field) && (formData[field] === null || formData[field].trim() === '' || formData[field] == [])) {
                return {
                    isValid: false,
                    message: `${requiredFields[field]} ne doit pas être vide.`
                };
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

        if (newFormData.category) {
            const newFormIdentityData = {
                ...newFormData,
                category: newFormData.category['@id']
            };
            await sendDataToAPI(newFormIdentityData);
        } else {
            await sendDataToAPI(newFormData);
        }
        await updateFormData(newFormData)
        notify('L\'identité de l\'entreprise à été mise à jour !', 'success');
        toggleEditState('identity');
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
            console.error('Erreur lors de la mise à jour des informations d\'identité de l\'entreprise', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="w-full flex flex-col gap-y-8 px-4 py-6" onSubmit={handleSubmit}>
            <div className="w-full flex items-start gap-x-16">
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Nom : </span>
                        <input type="text" name="name" defaultValue={formData.name} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">SIRET : </span>
                        <input type="text" name="siret" defaultValue={formData.siret} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Catégorie : </span>
                        <select name="category" defaultValue={formData.category} className="border-b py-1 ps-2 ms-2" onChange={handleChange}>
                            <option value="" hidden>Sélectionnez une catégorie</option>
                            {categories.map((category, index) => (
                                <option
                                    key={index}
                                    value={category['@id']}
                                    selected={category['@id'] === formData.category['@id']}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input type="text" name="phone_num" defaultValue={formData.phone_num} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Adresse : </span>
                        <input type="text" name="address" defaultValue={formData.address} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Complément d'adresse : </span>
                        <input type="text" name="additional_address" defaultValue={formData.additional_address} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Ville : </span>
                        <input type="text" name="city" defaultValue={formData.city} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Code postal : </span>
                        <input type="text" name="zip_code" defaultValue={formData.zip_code} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form >
    )
}