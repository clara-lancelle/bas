import React, { useState, useEffect } from "react";

export default function StudentExperiencesForm({ formData, setFormData, toggleEditState, notify, userId }) {
    const { REACT_APP_API_URL } = process.env;
    const [studyLevels, setStudyLevels] = useState([]);
    const [studyYears, setStudyYears] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        setLoading(true)
        const fetchStudyYears = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/students/StudyYears`);
                if (response.ok) {
                    const data = await response.json();
                    setStudyYears(data['hydra:member']);
                } else {
                    console.error('Failed to fetch StudyYears');
                }
            } catch (error) {
                console.error('Error fetching StudyYears:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchStudyYears();
    }, []);

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
        if ('study_years' in newFormData && newFormData.study_years.trim() === '') newErrors.study_years = "Le niveau d'étude est requis.";
        if ('prepared_degree' in newFormData && newFormData.prepared_degree.trim() === '') newErrors.prepared_degree = "Le diplôme préparé est requis.";

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
            console.error('Erreur lors de la mise à jour des experiences', errorData);
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
                        {studyYears.map((year, index) => (
                            <option key={index} value={year} selected={formData.study_years == year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.study_years && <p className="text-red-500">{errors.study_years}</p>}
                </label>
                <label>
                    <span className="font-semibold">Diplôme préparé : </span>
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
                    {errors.prepared_degree && <p className="text-red-500">{errors.prepared_degree}</p>}
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
