import React, { useState, useEffect } from "react";
import ExperienceAdder from "../../../Fields/ExperienceAdder";
import LanguagesAdder from "../../../Fields/LanguageLevel";
import SkillsAdder from "../../../Fields/SkillsList";

export default function StudentSkillsForm({ formData, setFormData, toggleEditState, notify, userId }) {
    const { REACT_APP_API_URL } = process.env;
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userToken = sessionStorage.getItem('token')

    const handleSkillsChange = (skills) => {
        setNewFormData((prevNewFormData) => ({
            ...prevNewFormData,
            skills: skills,
        }));
    }

    const handleLanguagesChange = (languages) => {
        console.log(languages)
        setNewFormData((prevNewFormData) => ({
            ...prevNewFormData,
            languages: languages,
        }));
    };

    const handleExperiencesChange = (experiences) => {
        setNewFormData((prevNewFormData) => ({
            ...prevNewFormData,
            experiences: experiences,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(newFormData);
        if (newFormData.skills) await sendSkillsToAPI(newFormData);
        if (newFormData.languages) await sendLanguagesToAPI(newFormData);
        if (newFormData.experiences) await sendExperiencesToAPI(newFormData);
        updateFormData(newFormData)
        notify('Votre compétences ont été mises à jour !', 'success');
        toggleEditState('skills');
    };

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const sendSkillsToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/students/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ skills: newData.skills })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des compétences', errorData);
            return;
        }

        const data = await response.json();
    }

    const sendLanguagesToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/students/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ languages: newData.languages })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des langues', errorData);
            return;
        }

        const data = await response.json();
    }

    const sendExperiencesToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/students/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ experiences: newData.experiences })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des langues', errorData);
            return;
        }

        const data = await response.json();
    }

    return (
        <form className="flex flex-col flex-wrap justify-between items-start px-4 py-6" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-y-4">
                <span className="font-semibold">Compétences : </span>
                    <SkillsAdder onSkillsChange={handleSkillsChange} initialSkills={formData.skills} />
                <span className="font-semibold">Langues et niveaux : </span>
                    <LanguagesAdder onLanguagesChange={handleLanguagesChange} initialLanguages={formData.languages} studentIRI={formData.iri} />
                <span className="font-semibold">Experiences professionnelles : </span>
                    <ExperienceAdder onExperiencesChange={handleExperiencesChange} initialExperiences={formData.experiences}/>
            </div>
            <div className="w-full flex justify-end mt-4">
                <button type="submit" className="btn-blue-dark">Enregistrer</button>
            </div>
        </form>
    );
}
