import React, { useState, useEffect, useRef } from "react";

export default function CompanyUserIdentityForm({ formData, setFormData, toggleEditState, notify }) {
    const { REACT_APP_API_URL } = process.env;
    const [genders, setGenders] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const userToken = sessionStorage.getItem('token')
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchGender = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/users/genders`);
                if (response.ok) {
                    const data = await response.json();
                    const categoriesData = data['hydra:member'];
                    setGenders(categoriesData);
                } else {
                    console.error('Failed to fetch Genders');
                }
            } catch (error) {
                console.error('Error fetching Genders:', error);
            }
        };
        setLoading(true)
        fetchGender();
        setLoading(false)
    }, []);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setNewFormData({ ...newFormData, profileImage: file }); // Optionnel: mise à jour de formData si nécessaire
            };
            reader.readAsDataURL(file);
        }
    };

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
            firstname: 'Prénom',
            name: 'Nom',
            gender: 'Genre',
            cellphone: 'Numéro de téléphone',
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

                if (field === 'cellphone') {
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
        notify('Votre fiche d\'identité à été mise à jour !', 'success');
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
            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                <div className="w-2/12">
                    <div className="relative rounded-full h-24 w-24 object-cover cursor-pointer" onClick={handleImageClick}>
                        <img
                            src={
                                selectedImage ||
                                (!formData.profileImage ||
                                    formData.profileImage === '' ||
                                    formData.profileImage === 'null'
                                    ? `${REACT_APP_API_URL}/assets/images/users/usr.png`
                                    : `${REACT_APP_API_URL}/assets/images/users/${formData.profileImage}`)
                            }
                            className="rounded-full h-24 w-24 object-cover"
                            alt={formData.profileImage || 'Photo de profil'}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-center">Modifier</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="w-10/12 flex items-start gap-x-16">
                    <div className="flex flex-col gap-y-4">
                        <label>
                            <span className="font-semibold">Prénom : </span>
                            <input type="text" name="firstname" defaultValue={formData.firstname} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        </label>
                        <label>
                            <span className="font-semibold">Nom : </span>
                            <input type="text" name="name" defaultValue={formData.name} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        </label>
                        <label>
                            <span className="font-semibold">Genre : </span>
                            <select name="gender" defaultValue={formData.gender} className="border-b py-1 ps-2 ms-2" onChange={handleChange}>
                                <option value="" hidden>Sélectionnez votre genre</option>
                                {genders.map((gender, index) => (
                                    <option
                                        key={index}
                                        value={gender}
                                        selected={gender === formData.gender}
                                    >
                                        {gender}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <p><span className="font-semibold">E-mail : </span>{formData.email}</p>
                        <label>
                            <span className="font-semibold">Téléphone : </span>
                            <input type="phone" name="cellphone" defaultValue={formData.cellphone} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
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
                            <input type="text" name="zipCode" defaultValue={formData.zipCode} className="border-b py-1 ps-2 ms-2" onChange={handleChange} />
                        </label>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form >
    )
}