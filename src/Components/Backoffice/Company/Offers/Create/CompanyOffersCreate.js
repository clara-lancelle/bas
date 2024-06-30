import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import CompanyHeader from "../../CompanyHeader";
import FormStep from './FormStep';
import CreateStepFirst from "./CreateStepFirst";
import CreateStepSecond from "./CreateStepSecond";
import CreateStepRecap from "./CreateStepRecap";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

export default function OfferCreate({ notify }) {
    const { REACT_APP_API_URL } = process.env
    const navigate = useNavigate();
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId')
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        ...FormStep,
        company: "",
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        revenue: "",
        remote: "",
        available_place: 0,
        application_limit_date: "",
        type: "",
        jobProfiles: [],
        required_profiles: [],
        skills: [],
        missions: [],

    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const companyResponse = await fetch(`${REACT_APP_API_URL}/api/companies/${userCompanyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                if (companyResponse.ok) {
                    const companyData = await companyResponse.json();
                    setCompany(companyData);
                    setFormData({ ...formData, company: companyData['@id'] })
                } else {
                    console.error('Failed to fetch company data');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [REACT_APP_API_URL, userCompanyId, userToken]);

    const extractIRIsAndFormat = (data) => {
        return {
            ...data,
            jobProfiles: data.jobProfiles.map(profile => profile['@id']),
            skills: data.skills.map(skill => skill['@id']),
            start_date: moment(data.start_date).format('DD/MM/YYYY'),
            end_date: moment(data.end_date).format('DD/MM/YYYY'),
            application_limit_date: moment(data.application_limit_date).format('DD/MM/YYYY'),
            available_place: parseInt(data.available_place),
        };
    };

    const handleSubmitForm = () => {
        const finalData = extractIRIsAndFormat(formData);
        sendDataToAPI(finalData)
    }

    const sendDataToAPI = async (offerData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/offers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify(offerData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des informations', errorData);
            return;
        }

        const data = await response.json();

        if (response.ok) {
            notify('Offre crée !', 'success')
            navigate('/backoffice/entreprise/offres')
        }
    }

    return (
        <div className="h-full flex">
            <Sidebar userType={'administrator'} activeItem="offers" />
            <div className="w-10/12">
                <CompanyHeader imageName={company.large_image} companyName={company.name} showOfferCreate={false} />
                <div className="mx-8">
                    <h2 className="text-3xl	text-grey-dark font-semibold">Publier une offre</h2>
                    <FormStep step={step} />

                    <div className="border-t-2">
                        {step == 1 && (
                            <CreateStepFirst setStep={setStep} step={step} formData={formData} setFormData={setFormData} notify={notify} />
                        )}
                        {step == 2 && (
                            <CreateStepSecond setStep={setStep} step={step} formData={formData} setFormData={setFormData} notify={notify} />
                        )}
                        {step == 3 && (
                            <CreateStepRecap setStep={setStep} step={step} formData={formData} notify={notify} submitForm={handleSubmitForm} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}