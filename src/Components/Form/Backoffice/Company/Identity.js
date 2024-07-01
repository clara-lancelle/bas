import React, { useState, useEffect } from "react";

export default function CompanyIdentityForm({ formData, setFormData, toggleEditState, notify }) {
    const { REACT_APP_API_URL } = process.env;
    const [categories, setCategories] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
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

    const validateFormData = () => {
        const newErrors = {};
        const phoneRegex = /^0\d{9}$/;
        if ('name' in newFormData && newFormData.name.trim() === '') newErrors.name = "Le nom de l'entreprise est requis.";
        if ('siret' in newFormData && newFormData.siret.trim() === '') newErrors.siret = "Le SIRET est requis.";
        if ('siret' in newFormData && newFormData.siret.length !== 14) newErrors.siret = "Le SIRET doit faire 14 caractères.";
        if ('siret' in newFormData && !/^\d+$/.test(newFormData.siret)) newErrors.siret = "Le SIRET ne doit contenir que des chiffres.";
        if ('category' in newFormData && newFormData.category.trim() === '') newErrors.category = "La catégorie est requise.";
        if ('address' in newFormData && newFormData.address.trim() === '') newErrors.address = "L'adresse est requise.";
        if ('city' in newFormData && newFormData.city.trim() === '') newErrors.city = "La ville est requise.";
        if ('zip_code' in newFormData && newFormData.zip_code.trim() === '') newErrors.zip_code = "Le code postal est requis.";
        if ('phone_num' in newFormData && !phoneRegex.test(newFormData.phone_num)) newErrors.phone_num = "Téléphone invalide.";
        if ('phone_num' in newFormData && newFormData.phone_num.trim() === '') newErrors.phone_num = "Le téléphone est requis.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            if (newFormData.category) {
                const newFormIdentityData = {
                    ...newFormData,
                    category: newFormData.category['@id']
                };
                await sendDataToAPI(newFormIdentityData);
            } else {
                await sendDataToAPI(newFormData);
            }
            await updateFormData(newFormData);
            notify('L\'identité de l\'entreprise à été mise à jour !', 'success');
            toggleEditState('identity');
        } else {
            notify('Vérifiez vos champs', 'error');
        };
    }

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
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">SIRET : </span>
                        <input type="text" name="siret" defaultValue={formData.siret} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.siret && <p className="text-red-500">{errors.siret}</p>}
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
                        {errors.category && <p className="text-red-500">{errors.category}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input type="text" name="phone_num" defaultValue={formData.phone_num} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.phone_num && <p className="text-red-500">{errors.phone_num}</p>}
                    </label>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Adresse : </span>
                        <input type="text" name="address" defaultValue={formData.address} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.address && <p className="text-red-500">{errors.address}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Complément d'adresse : </span>
                        <input type="text" name="additional_address" defaultValue={formData.additional_address} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Ville : </span>
                        <input type="text" name="city" defaultValue={formData.city} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Code postal : </span>
                        <input type="text" name="zip_code" defaultValue={formData.zip_code} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        {errors.zip_code && <p className="text-red-500">{errors.zip_code}</p>}
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form >
    )
}