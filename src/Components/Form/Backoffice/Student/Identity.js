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


    const validateFormData = (newFormData) => {
        const newErrors = {};
        if (newFormData.firstname && newFormData.firstname.trim() === '') newErrors.firstname = "Le prénom est requis."; 
        if (newFormData.name && newFormData.name.trim() === '') newErrors.name = "Le nom est requis."; 
        if (newFormData.gender && newFormData.gender.trim() === '') newErrors.gender = "Le genre est requis."; 
        if (newFormData.birthdate && newFormData.birthdate.trim() === '') newErrors.start_date = "La date de naissance est requise."; 
        if (newFormData.address && newFormData.address.trim() === '') newErrors.address = "L'adresse est requise."; 
        if (newFormData.city && newFormData.city.trim() === '') newErrors.city = "La ville est requise."; 
        if (newFormData.zipCode && newFormData.zipCode.trim() === '') newErrors.zipCode = "Le code postal est requis."; 
        if (newFormData.cellphone && newFormData.cellphone.trim() === '') {
            newErrors.cellphone = "Téléphone est requis.";
        } else {
            const phoneRegex = /^0\d{9}$/;
            if (newFormData.cellphone && !phoneRegex.test(newFormData.cellphone)) {
                newErrors.cellphone = "Téléphone invalide.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData(newFormData)) {
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
            console.error('Erreur lors de la mise à jour des informations d\'identité de l\'entreprise', errorData);
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
                        <input className="border-b py-1 ps-2 ms-2" name="firstname" defaultValue={formData.firstname} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Nom : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="name" defaultValue={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Genre : </span>
                        <select name="gender" defaultValue={formData.gender} onChange={handleChange}>
                            <option value="">Sélectionnez le genre</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span className="font-semibold">Date de naissance : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="birthdate" defaultValue={formData.birthdate} onChange={handleChange} type="date" />
                    </label>
                    <p><span className="font-semibold">E-mail : </span>{formData.email || 'Non renseigné'}</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <label>
                        <span className="font-semibold">Téléphone : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="cellphone" defaultValue={formData.cellphone} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Adresse : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="address" defaultValue={formData.address} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Complément d'adresse : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="additionalAddress" defaultValue={formData.additionalAddress} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Ville : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="city" defaultValue={formData.city} onChange={handleChange} />
                    </label>
                    <label>
                        <span className="font-semibold">Code postal : </span>
                        <input className="border-b py-1 ps-2 ms-2" name="zipCode" defaultValue={formData.zipCode} onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    );
}
