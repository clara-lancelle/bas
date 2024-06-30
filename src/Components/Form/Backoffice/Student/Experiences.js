import React, { useState, useEffect, useRef } from "react";

export default function StudentExperiencesForm({ formData, setFormData, toggleEditState, notify, userId }) {
    const { REACT_APP_API_URL } = process.env;
    const [studyLevels, setStudyLevels] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const userToken = sessionStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        const fetchStudyLevels = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/offers/studyLevels`);
                if (response.ok) {
                    const data = await response.json();
                    setStudyLevels(data['hydra:member']);
                } else {
                    console.error('Failed to fetch StudyLevels');
                }
            } catch (error) {
                console.error('Error fetching StudyLevels:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchStudyLevels();
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
        if (newFormData.study_years && newFormData.study_years.trim() === '') newErrors.study_years = "Le niveau d'étude est requis.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData(newFormData)) {
            await sendDataToAPI(newFormData);
            await updateFormData(newFormData)
            notify('Votre expericences ont été mises à jour !', 'success');
            toggleEditState('experiences');
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
        <form className="flex flex-col flex-wrap justify-between items-start px-4 py-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <label>
                    <span className="font-semibold">Niveau d'étude : </span>
                    <select name="study_years" defaultValue={formData.study_years} onChange={handleChange}>
                        <option value="">Sélectionnez le niveau</option>
                        {studyLevels.map((level, index) => (
                            <option key={index} value={level} selected={formData.study_years == level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="font-semibold">Diplôme pérparé : </span>
                    <select name="prepared_degree" defaultValue={formData.prepared_degree} onChange={handleChange}>
                        <option value="">Sélectionnez le niveau</option>
                        {studyLevels.map((level, index) => (
                            <option
                                key={index}
                                value={level}
                                selected={formData.prepared_degree == level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="font-semibold">Nom de l’établissement : </span>
                    <input className="border-b py-1 ps-2 ms-2" name="school_name" defaultValue={formData.school_name} onChange={handleChange} type="text" />
                </label>

            </div>
            <div className="w-full flex justify-end mt-4">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    );
}
