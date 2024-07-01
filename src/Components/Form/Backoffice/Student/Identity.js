import React, { useState, useEffect, useRef } from "react";
import "../../../../Styles/Form/Backoffice/studentIdentity.css"

export default function StudentIdentityForm({ formData, setFormData, toggleEditState, notify, userId }) {
    const { REACT_APP_API_URL } = process.env;
    const [genders, setGenders] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const userToken = sessionStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        const fetchGenders = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/users/genders`);
                if (response.ok) {
                    const data = await response.json();
                    setGenders(data['hydra:member']);
                } else {
                    console.error('Failed to fetch genders');
                }
            } catch (error) {
                console.error('Error fetching genders:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchGenders();
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
                setNewFormData({ ...newFormData, profileImage: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFormData((newFormData) => ({
            ...newFormData,
            [name]: value
        }))
        setErrors({ ...errors, [name]: '' });
    }


    const validateFormData = () => {
        const newErrors = {};
        const phoneRegex = /^0\d{9}$/;
        if ('firstname' in newFormData && newFormData.firstname.trim() === '') newErrors.firstname = "Le prénom est requis.";
        if ('name' in newFormData && newFormData.name.trim() === '') newErrors.name = "Le nom est requis.";
        if ('gender' in newFormData && newFormData.gender.trim() === '') newErrors.gender = "Le genre est requis.";
        if ('birthdate' in newFormData && newFormData.birthdate.trim() === '') newErrors.birthdate = "La date de naissance est requise.";
        if ('address' in newFormData && newFormData.address.trim() === '') newErrors.address = "L'adresse est requise.";
        if ('city' in newFormData && newFormData.city.trim() === '') newErrors.city = "La ville est requise.";
        if ('zipCode' in newFormData && newFormData.zipCode.trim() === '') newErrors.zipCode = "Le code postal est requis.";
        if ('cellphone' in newFormData && !phoneRegex.test(newFormData.cellphone)) newErrors.cellphone = "Téléphone invalide.";
        if ('cellphone' in newFormData && newFormData.cellphone.trim() === '') newErrors.cellphone = "Téléphone est requis.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            await sendDataToAPI(newFormData);
            await updateFormData(newFormData)
            notify('Votre fiche d\'identité à été mise à jour !', 'success');
            toggleEditState('identity');
        } else {
            notify('Vérifiez vos champs', 'error')
        }
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
            console.error('Erreur lors de la mise à jour des informations d\'identité', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="flex flex-wrap justify-between items-start px-4 py-6" onSubmit={handleSubmit}>
            <div className="w-2/12 relative group">
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
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.firstname ? 'border-red-500' : ''}`} name="firstname" defaultValue={formData.firstname} onChange={handleChange} />
                        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Nom : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.name ? 'border-red-500' : ''}`} name="name" defaultValue={formData.name} onChange={handleChange} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Genre : </span>
                        <select name="gender" defaultValue={formData.gender} onChange={handleChange}>
                            <option value="">Sélectionnez le genre</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={gender} selected={formData.gender == gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Date de naissance : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.birthdate ? 'border-red-500' : ''}`} name="birthdate" defaultValue={formData.birthdate} onChange={handleChange} type="date" />
                        {errors.birthdate && <p className="text-red-500">{errors.birthdate}</p>}
                    </label>
                    <p><span className="font-semibold">E-mail : </span>{formData.email || 'Non renseigné'}</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.cellphone ? 'border-red-500' : ''}`} name="cellphone" defaultValue={formData.cellphone} onChange={handleChange} />
                        {errors.cellphone && <p className="text-red-500">{errors.cellphone}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Adresse : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.address ? 'border-red-500' : ''}`} name="address" defaultValue={formData.address} onChange={handleChange} />
                        {errors.address && <p className="text-red-500">{errors.address}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Complément d'adresse : </span>
                        <input className={`border-b py-1 ps-2 ms-2`} name="additional_address" defaultValue={formData.additional_address} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Ville : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.city ? 'border-red-500' : ''}`} name="city" defaultValue={formData.city} onChange={handleChange} />
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                    </label>
                    <label>
                        <span className="font-semibold">Code postal : </span>
                        <input className={`border-b py-1 ps-2 ms-2 ${errors.zipCode ? 'border-red-500' : ''}`} name="zipCode" defaultValue={formData.zipCode} onChange={handleChange} />
                        {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    );
}
