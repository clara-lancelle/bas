import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import JobProfiles from "../JobProfiles/JobProfiles";
import CompanyDetailPictures from './CompanyDetailPictures';
import arrowRight from '../../Images/Icons/arrow-right-dark.svg'
import check from '../../Images/Icons/check-rounded.svg'
import fire from '../../Images/Icons/fire.svg'
import users from '../../Images/Icons/users.svg'
import cash from '../../Images/Icons/cash.svg'
import mapPoint from '../../Images/Icons/map-point.svg'
import linkedin from '../../Images/Icons/linkedin-blue.svg'
import twitter from '../../Images/Icons/twitter-blue.svg'
import facebook from '../../Images/Icons/facebook-blue.svg'
import instagram from '../../Images/Icons/instagram-blue.svg'
import mail from '../../Images/Icons/mail-blue.svg'
import mwLogo from '../../Images/Company/mw-logo-large.png'
import mwPicture from '../../Images/Temp/company-1.png'
import './companyList.css';


export default function CompanyDetail() {

    const [company, setCompany] = useState([])
    const [internshipOffers, setInternshipOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const { REACT_APP_API_URL } = process.env;
    const location = useLocation();

    // Temporaire, le temps d'ajouter la gallerie photo d'une entreprise en base de données
    const pictures = [
        { url: mwPicture },
        { url: mwPicture },
        { url: mwPicture },
        { url: mwPicture },
        { url: mwPicture },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the company using the company ID from the offer
                const companyResponse = await fetch(`${REACT_APP_API_URL}/api/companies/${location.state.companyId}`);
                const companyData = await companyResponse.json();
                setCompany(companyData);

                const internshipOffersResponse = await fetch(`${REACT_APP_API_URL}/api/offers?order[created_at]=asc}`);
                const internshipOffersData = await internshipOffersResponse.json()
                setInternshipOffers(internshipOffersData['hydra:member'] || []);

                // Set loading to false after all data is fetched
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [REACT_APP_API_URL, location.state.companyId]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    const getCompanyAge = (creationDate) => {
        if (!creationDate) return 'Inconnue';

        const today = new Date();
        const creationDateObj = new Date(creationDate);
        let age = today.getFullYear() - creationDateObj.getFullYear();
        const monthDifference = today.getMonth() - creationDateObj.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < creationDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const companyAge = getCompanyAge(company.creation_date)

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { url: '/entreprises', text: 'Entreprises' },
                        { url: '/entreprise/', text: company.name }, // Id et nom de l'entreprise
                    ]} />
                    <div className="mt-8 mb-6">
                        <h1 className="text-5xl font-bold text-grey-dark">{company.name}</h1>
                        {company.website_url ?
                            <Link to={company.website_url} target="_blank" className="bg-white px-3 py-2 mt-4 text-blue-dark font-semibold flex items-center w-fit rounded-md"><span>mentalworks.fr</span><img src={arrowRight} className="ms-4 text-blue-dark" width="16px" style={{ fill: '#4640DE' }}></img></Link>
                            : ''}
                    </div>
                    <div className="flex gap-10 justify-start">
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={check} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Activité</span>
                                <span className="font-semibold">{company.activity.name}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={fire} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Ancienneté</span>
                                <span className="font-semibold">{companyAge}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={users} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Effectifs</span>
                                <span className="font-semibold">{company.workforce}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={cash} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Chiffre d'affaire</span>
                                <span className="font-semibold">1,2 M€</span>{/* A ajouter en base */}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={mapPoint} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Situation</span>
                                <span className="font-semibold">{company.city} ({company.zip_code})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-14 container flex ">
                <div className="w-2/3 mr-16">
                    <div className="mb-6">
                        <h2 className="font-semibold mb-4 text-3xl">Présentation</h2>
                        <p>{company.description}</p>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-6 text-3xl">Réseaux sociaux</h2>
                        <div className="flex gap-4 justify-start">
                            <Link to="https://linkedin.com" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={linkedin} width="24px"></img>
                                <span>linkedin.com</span>
                            </Link>
                            <Link to="https://twitter.com" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={twitter} width="24px"></img>
                                <span>twitter.com</span>
                            </Link>
                            <Link to="https://facebook.com" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={facebook} width="24px"></img>
                                <span>facebook.com</span>
                            </Link>
                            <Link to="https://instagram.com" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={instagram} width="24px"></img>
                                <span>Instagram</span>
                            </Link>
                        </div>
                    </div>

                    <div className="">
                        <CompanyDetailPictures pictures={pictures} />
                    </div>
                </div>

                <div className="w-1/3">
                    <img src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${company.large_image}`} className="max-w-full max-h-[80px] mb-10" />
                    <div className="mb-4">
                        <h2 className="text-[32px] font-semibold mb-4 text-grey-dark">Situation</h2>
                        <div className="flex flex-col opacity-70">
                            <span className="font-bold">{company.name}</span>
                            <span>{company.adress}</span>
                            <span>Bâtiment Millenium</span>{/* Comp. adresse de l'entreprise a ajouter en base de données */}
                            <span>{company.zip_code} {company.city}</span>
                        </div>
                    </div>
                    <div className="pb-4 mb-10 border-b">
                        <Link to="#" state={{ companyId: company.id }} className="text-blue-dark flex items-center font-semibold mb-2">Voir sur la carte <img src={arrowRight} className="ms-2" /></Link>
                        {/* Composant map une fois l'adresse obtenue */}
                    </div>
                    <div className="mb-10 pb-10 border-b">
                        <h2 className="text-[32px] font-semibold mb-4 text-grey-dark">Nous joindre</h2>
                        <div className="flex flex-col opacity-70">
                            <span>Téléphone: {company.phone_num}</span>{/* Téléphone */}
                            <span>Du lundi au vendredi de 8h30 à 18h30</span>{/* Horaires */}
                        </div>
                        <Link to="#" state={{ companyId: company.id }} className="text-blue-dark flex items-center font-semibold mt-6">Nous envoyer un message <img src={arrowRight} className="ms-2" /></Link>
                    </div>
                    <div className="mb-10 pb-10 flex flex-col gap-y-6">
                        <h2 className="text-[32px] font-semibold text-grey-dark">Vos contacts</h2>
                        <div className="flex flex-col gap-y-2 pb-2 border-b">
                            <span className="font-bold  opacity-70">Directeur des ressources humaines</span>{/* Poste */}
                            <p className="opacity-70">Olivier <span className="uppercase">SALESSE</span></p>{/* prénom NOM */}
                            <div className="flex gap-4">
                                <Link to="https://linkedin.com"><img src={linkedin} width="24px" /></Link>
                                <Link to="mailto:temp@mentalworks.com"><img src={mail} width="24px" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pb-20 pt-18 last-request-container">
                <div className="container">
                    <h2 className="text-[32px] font-semibold text-grey-dark leading-110">Offres de stage proposées</h2>
                    <div className="mt-12 mb-18 offer-container">
                        {internshipOffers?.slice(0, 4)?.map(({ company: { picto_image, name: companyName, city, ...rest }, type, id, description, name, job_profiles, ...items }) => (
                            <Link to={`/offre/${id}`} state={{ offerId: id }} key={id} className="offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                                <div>
                                    <h3 className="font-semibold text-[18px]">{name}</h3>{/* Intitulé du poste */}
                                    <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>{/* Durée du stage */}
                                </div>
                                <p className="!max-h-16 opacity-50 text-md relative txt-elipsis">{description}</p>{/* Description de l'offre (raccourci a l'espace)*/}
                                <div className="flex justify-start items-center flex-wrap gap-2">
                                    {job_profiles?.map((profile) => (
                                        <JobProfiles profile={profile} />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <h2 className="text-[32px] font-semibold text-grey-dark leading-110 mt-13">Offres d'alternance proposées</h2>
                    <div className="mt-12 mb-18 offer-container">
                        {internshipOffers?.slice(0, 4)?.map(({ company: { picto_image, name: companyName, city, ...rest }, type, id, description, name, job_profiles, ...items }) => (
                            <Link to={`/offre/${id}`} state={{ offerId: id }} key={id} className="offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                                <div>
                                    <h3 className="font-semibold text-[18px]">{name}</h3>{/* Intitulé du poste */}
                                    <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>{/* Durée du stage */}
                                </div>
                                <p className="!max-h-16 opacity-50 text-md relative txt-elipsis">{description}</p>{/* Description de l'offre (raccourci a l'espace)*/}
                                <div className="flex justify-start items-center flex-wrap gap-2">
                                    {job_profiles?.map((profile) => (
                                        <JobProfiles profile={profile} />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}