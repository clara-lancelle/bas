import Reac, { useState, useEffect } from 'react';
import moment from 'moment';

const RecapPage = ({ formData, setStep, submitForm }) => {
    const { REACT_APP_API_URL } = process.env
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId')
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(false)

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

    const handlePreviousStep = (e) => {
        e.preventDefault()
        setStep((prevStep) => prevStep - 1);
    }

    if (loading) {
        return (<p>Chargement ...</p>)
    } else {
        return (
            <div className="recap-page p-4">
                <h2 className="text-2xl font-bold mb-4">Récapitulatif</h2>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-12">
                        <p className="font-semibold text-grey-dark">Entreprise</p>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className='px-2 pb-1'>{company.name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-start py-6 border-b">
                    <div className='flex mb-4 w-full'>

                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Nom de l'offre</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{formData.name}</span>
                        </div>
                    </div>
                    <div className='flex w-full'>

                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Type de contrat</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{formData.type}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start py-6 border-b">
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Date de début</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{moment(formData.start_date).format('DD/MM/YYYY')}</span>
                        </div>
                    </div>
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Date de fin</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{moment(formData.end_date).format('DD/MM/YYYY')}</span>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Date limite de candidature</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{moment(formData.application_limit_date).format('DD/MM/YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start py-6 border-b">
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Nombre de places disponibles</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{formData.available_place}</span>
                        </div>
                    </div>
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Télétravail</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{formData.remote}</span>
                        </div>
                    </div>
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Rémunération</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <span className='px-2 pb-1'>{formData.revenue}</span>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Description</p>
                        </div>
                        <div className="flex flex-col w-2/3 gap-y-1">
                            <span className='px-2 pb-1'>{formData.description}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start py-6 mb-6 border-b">
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Missions</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <ul className='list-style-logo pb-1'>
                                {(formData.missions || []).map((mission, index) => (
                                    <li key={index}>{mission.text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Profils recherchés</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <ul className='list-style-logo pb-1'>
                                {(formData.jobProfiles || []).map((profile, index) => (
                                    <li key={index}>{profile.name} </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex mb-4 w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Profils requis</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <ul className='list-style-logo pb-1'>
                                {(formData.required_profiles || []).map((profile, index) => (
                                    <li key={index}>{profile.text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className="w-[250px] me-12">
                            <p className="font-semibold text-grey-dark">Compétences</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <ul className='list-style-logo pb-1'>
                                {(formData.skills || []).map((skill, index) => (
                                    <li key={index}>{skill.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full pt-6 pb-8">
                    <button className="btn-blue-dark" onClick={handlePreviousStep}>Etape précédente</button>
                    <button className="btn-blue-dark" onClick={submitForm}>Créer l'offre</button>
                </div>
            </div>
        );
    };
}

export default RecapPage;
