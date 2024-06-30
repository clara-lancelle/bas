import React, { useState, useEffect, useRe } from "react";
import checkboxChecked from "../../../../../Images/Icons/checkbox-checked.svg";
import JobProfilesAdder from "../../../../Fields/Backoffice/JobProfiles";
import SkillsAdder from "../../../../Fields/Backoffice/Skills";

export default function CreateStepFirst({ setStep, step, formData, setFormData, notify }) {
    const { REACT_APP_API_URL } = process.env
    const [selectedValue, setSelectedValue] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleRadioChange = (value) => {
        setSelectedValue(value);
        setFormData({ ...formData, type: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        setErrors({ ...errors, [name]: '' });
    }

    const calculateMonthDifference = (startDate, endDate) => {
        const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
        const monthsDifference = endDate.getMonth() - startDate.getMonth();
        const totalMonths = yearsDifference * 12 + monthsDifference;

        if (endDate.getDate() < startDate.getDate()) {
            return totalMonths - 1;
        }

        return totalMonths;
    };

    const validateFormData = () => {
        const newErrors = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!formData.name || formData.name.trim() === '') newErrors.name = "Le nom est requis.";
        if (!formData.type || formData.type.trim() === '') newErrors.type = "Le type est requis.";
        if (!formData.start_date || formData.start_date.trim() === '') {
            newErrors.start_date = "La date de début est requise.";
        } else {
            const startDate = new Date(formData.start_date);
            if (startDate < today) {
                newErrors.start_date = "La date de début doit être supérieure ou égale à aujourd'hui.";
            }
        }
        if (!formData.end_date || formData.end_date.trim() === '') newErrors.end_date = "La date de fin est requise.";
        if (!formData.application_limit_date || formData.application_limit_date.trim() === '') {
            newErrors.application_limit_date = "La date limite de candidature est requise.";
        } else {
            const applicationLimitDate = new Date(formData.application_limit_date);
            const start = new Date(formData.start_date);
            if (applicationLimitDate >= start) {
                newErrors.application_limit_date = "La date limite de candidature doit être inférieure à la date de début de contrat.";
            }
        }
        if (!formData.available_place || isNaN(formData.available_place) || formData.available_place <= 0) {
            newErrors.available_place = "Le nombre de places disponibles est requis et doit être un chiffre.";
        }
        if (!formData.remote || formData.remote.trim() === '') newErrors.remote = "Le télétravail doit être renseigné.";
        if (formData.type == 'Stage') {
            if (!formData.revenue || isNaN(formData.revenue) || formData.revenue.trim() === '') {
                newErrors.revenue = "La rémunération est requise et doit être un chiffre.";
            } else {
                const startDate = new Date(formData.start_date);
                const endDate = new Date(formData.end_date);
                const monthsDifference = calculateMonthDifference(startDate, endDate);
                if (monthsDifference >= 2 && formData.revenue <= 575) {
                    newErrors.revenue = "La rémunération doit être supérieure à 575€ si l'offre dure plus de 2 mois.";
                }
            }
        }
        if(formData.type === 'Alternance'){
            if (!formData.revenue || isNaN(formData.revenue) || formData.revenue.trim() === '') {
                newErrors.revenue = "La rémunération est obligatoire pour un contrat d'alternance.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateFormData()) {
            setStep((prevStep) => prevStep + 1);
        } else {
            notify('Vérifiez vos entrées.', 'error')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Nom de l'offre</p>
                        <span className="text-grey-placeholder">Décrivez le nom de l’offre de stage ou d’alternance</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='text' name='name' placeholder="ex: Assistant marketing" defaultValue={formData.name !== '' ? formData.name : ''} className="px-4 py-3 border w-[430px]" onChange={handleChange}></input>
                        <span className="text-grey-placeholder">Au moins 10 caractères</span>
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Type d'offre</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                onChange={() => handleRadioChange('Stage')}
                                className="hidden"
                                name="type"
                                value="Stage"
                                checked={selectedValue === 'Stage' || formData.type && formData.type === 'Stage'}
                            />
                            <div className={`w-6 h-6 flex items-center justify-center rounded ${selectedValue === 'Stage' || formData.type && formData.type === 'Stage' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                {selectedValue === 'Stage' || (!selectedValue && formData.type && formData.type === 'Stage') && (
                                    <img src={checkboxChecked} alt="checked" />
                                )}
                            </div>
                            <span className="ml-[10px] opacity-70">Stage</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                onChange={() => handleRadioChange('Alternance')}
                                className="hidden"
                                name="type"
                                value="Alternance"
                                checked={selectedValue === 'Alternance' || formData.type && formData.type === 'Alternance'}
                            />
                            <div className={`w-6 h-6 flex items-center justify-center rounded ${selectedValue === 'Alternance' || formData.type && formData.type === 'Alternance' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                {selectedValue === 'Alternance' || (!selectedValue && formData.type && formData.type === 'Alternance') && (
                                    <img src={checkboxChecked} alt="checked" />
                                )}
                            </div>
                            <span className="ml-[10px] opacity-70">Alternance</span>
                        </label>
                        {errors.type && <p className="text-red-500">{errors.type}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Début de l'offre</p>
                        <span className="text-grey-placeholder">Date de début du contrat</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='date' name='start_date' defaultValue={formData.start_date !== '' ? formData.start_date : ''} className="px-4 py-3 border" onChange={handleChange}></input>
                        {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Fin de l'offre</p>
                        <span className="text-grey-placeholder">Date de fin du contrat</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='date' name='end_date' defaultValue={formData.end_date !== '' ? formData.end_date : ''} className="px-4 py-3 border" onChange={handleChange}></input>
                        {errors.end_date && <p className="text-red-500">{errors.end_date}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Date limite de postulation</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='date' name='application_limit_date' defaultValue={formData.application_limit_date !== '' ? formData.application_limit_date : ''} className="px-4 py-3 border" onChange={handleChange}></input>
                        {errors.application_limit_date && <p className="text-red-500">{errors.application_limit_date}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Places disponibles</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='number' name='available_place' placeholder={formData.available_place} defaultValue={formData.available_place !== '' ? formData.available_place : ''} className="px-4 py-3 border" onChange={handleChange}></input>
                        {errors.available_place && <p className="text-red-500">{errors.available_place}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Rémunération</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='number' name='revenue' placeholder="Montant par mois" defaultValue={formData.revenue !== '' ? formData.revenue : ''} className="px-4 py-3 border w-[430px]" onChange={handleChange}></input>
                        <span className="text-grey-placeholder">575 € par mois minimum pour les stages de plus de 2 mois</span>
                        {errors.revenue && <p className="text-red-500">{errors.revenue}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Télétravail</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <input type='text' name='remote' placeholder="1 jour par semaine" defaultValue={formData.remote !== '' ? formData.remote : ''} className="px-4 py-3 border w-[430px]" onChange={handleChange}></input>
                        {errors.remote && <p className="text-red-500">{errors.remote}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Profils métiers</p>
                        <span className="text-grey-placeholder">Ajoutez les métiers recherchés</span>

                    </div>
                    <div className="flex flex-col gap-y-1">
                        <JobProfilesAdder
                            selectedProfiles={formData.jobProfiles}
                            setSelectedProfiles={(profiles) => setFormData((prevFormData) => ({ ...prevFormData, jobProfiles: profiles }))}
                        />
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Compétences</p>
                        <span className="text-grey-placeholder">Ajoutez les compétences recherchés</span>

                    </div>
                    <div className="flex flex-col gap-y-1">
                        <SkillsAdder
                            selectedSkills={formData.skills}
                            setSelectedSkills={(skills) => setFormData((prevFormData) => ({ ...prevFormData, skills: skills }))}
                        />
                    </div>
                </div>
                <div className="flex justify-end w-full pt-6 pb-8">
                    <button type="submit" className="btn-blue-dark">Etape suivante</button>
                </div>
            </form>
        </>
    )
}