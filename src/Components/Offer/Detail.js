import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Ariane from "../Partials/Ariane";
import JobProfiles from "../JobProfiles/JobProfiles";
import MapComponent from '../Partials/MapComponent'
import ProgressBar from "../ProgressBar/ProgressBar";
import Skill from "../Skill/Skill";
import arrowRight from '../../Images/Icons/arrow-right-dark.svg'
import share from "../../Images/Icons/share.svg";

export default function OfferDetail() {
    const [internshipOffers, setInternshipOffers] = useState([])
    const [offer, setOffer] = useState([])
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(true);

    const { REACT_APP_API_URL } = process.env;
    const location = useLocation();

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const ariane = (offerType, offerName, offerId) => {
        if (offerType == 'stage') {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/offres/stage', text: 'Stage' },
                    { url: '/offre/stage/' + offerId, text: offerName },
                ]} />
            )
        } else {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/offres/alternance', text: 'Alternance' },
                    { url: '/offre/alternance/' + offerId, text: offerName },
                ]} />
            )
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offerResponse = await fetch(`${REACT_APP_API_URL}/api/offers/${location.state.offerId}`);
                const offerData = await offerResponse.json();
                setOffer(offerData);

                const companyResponse = await fetch(`${REACT_APP_API_URL}/api/companies/${offerData.company.id}`);
                const companyData = await companyResponse.json();
                setCompany(companyData);

                const internshipOffersResponse = await fetch(`${REACT_APP_API_URL}/api/offers?order[created_at]=asc}`);
                const internshipOffersData = await internshipOffersResponse.json()
                setInternshipOffers(internshipOffersData['hydra:member'] || []);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [REACT_APP_API_URL, location.state.offerId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">

                    {ariane('stages', 'Assistant Web Marketing', 1)}
                    <div className="mt-18">
                        <div className="p-6 border border-white-light bg-white mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <img alt="" src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${company.picto_image}`} className="w-16 h-16 object-contain"></img>
                                    <div className="ms-6">
                                        <h1 className="mb-2 font-semibold text-[32px] leading-8">{offer.name}</h1>
                                        <p className="mb-2 text-xl"><span className="font-bold">{offer.company.name}</span> • {offer.company.city} • Du {offer.start_date} au {offer.end_date} ({offer.calculatedDuration} jours) </p>
                                        <div className="flex items-center">
                                            <div className="pr-2 border-r">
                                                <span className="text-blue-dark tag-contract">{offer.type}</span>
                                            </div>
                                            <div className="flex justify-start items-center flex-wrap gap-2 ml-2">
                                                {offer.job_profiles?.map((profile) => (
                                                    <JobProfiles profile={profile} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-x-8">
                                    <div className="border-r pr-8">
                                        <Link to="https://linkedin.fr" className="flex items-center h-full"><img src={share} className="w-[32px] min-w-[32px]"></img></Link>
                                    </div>

                                    <div className="flex items-center text-white font-bold bg-blue-dark">
                                        <Link to="postuler" className="px-14 py-4" state={{ offerId: offer.id }}>Postuler</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-14 pb-18 border-b container flex ">
                <div className="w-2/3 mr-16">
                    <div className="mb-10">
                        <h2 className="font-semibold mb-4 text-[32px] text-grey-dark">A propos de ce stage</h2>
                        <p>{offer.description}</p>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-4 text-[32px] text-grey-dark">Missions</h2>
                        <ul className="list-img-check">
                            {offer.missions.map((mission) => (
                                <li>{mission.text}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-4 text-[32px] text-grey-dark">Profil recherché</h2>
                        <ul className="list-img-check">
                            {offer.required_profiles.map((required_profile) => (
                                <li>{required_profile.text}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center text-white font-bold bg-blue-dark w-fit py-4 px-10">
                        <Link to="postuler" state={{ offerId: offer.id }}>Postuler</Link>
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="pb-10 border-b">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Échéances</h2>
                        <div className="p-4 flex flex-col bg-light-grey mb-6">
                            <span className="mb-2">Reste {offer.calculatedLimitDays} jours pour postuler</span>
                            <ProgressBar limitDays={offer.calculatedLimitDays} />
                        </div>
                        <div className="flex flex-col gap-y-6 justify-between">
                            <div className="flex justify-between">
                                <span>Postuler avant le</span>
                                <span className="font-semibold text-blue-dark">{offer.application_limit_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Offre publiée le</span>
                                <span className="font-semibold text-blue-dark">{formatDate(offer.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Type d’offre</span>
                                <span className="font-semibold text-blue-dark">{offer.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Gratification</span>
                                <span className="font-semibold text-blue-dark">{offer.revenue}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Candidatures déposées</span>
                                <span className="font-semibold text-blue-dark">??</span> {/* Get des candidatures pour l'id de l'offre actuelle  */}
                            </div>
                        </div>
                    </div>

                    <div className="py-10 border-b">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Profils métiers</h2>
                        <div className="flex flex-wrap justify-start gap-x-2">
                            {offer.job_profiles.map((job_profile) => (
                                <JobProfiles profile={job_profile} />
                            ))}
                        </div>
                    </div>

                    <div className="py-10">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Compétences recherchées</h2>
                        <div className="flex flex-wrap justify-start gap-2">
                            {offer.skills.map((skill) => (
                                <Skill skill={skill} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-18 flex container">
                <div className="w-1/2 mr-11">
                    <Link to={`/entreprise/${company.id}`} state={{ companyId: company.id }}><img alt={`${company.name} image`} src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${company.large_image}`} className="max-w-full mb-8"></img></Link>
                    <p className="mb-8">
                        {company.description}
                    </p>
                    <Link to={`/entreprise/${company.id}`} state={{ companyId: company.id }} className="text-blue-dark flex items-center font-semibold mt-6">En savoir plus sur {company.name} <img src={arrowRight} className="ms-2" /></Link>
                </div>
                <div className="w-1/2 flex justify-end">
                    {company.companyImages && company.companyImages.length >= 3 && (
                        <div className="w-1/3 flex flex-col gap-y-4 mr-4">
                            {company.companyImages.slice(0, 3).map((image, index) => (
                                <img
                                    key={image['@id']}
                                    src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${image.path}`}
                                    className="w-full h-[130px] object-cover"
                                    alt={image.name}
                                />
                            ))}
                        </div>
                    )}
                    <div className="w-2/3 h-[422px]">
                        <MapComponent
                            name={company.name}
                            address={company.address}
                            city={company.city}
                            postalCode={company.zip_code}
                            className="h-[422px]"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-16 pb-20 pt-18 last-request-container">
                <div className="container">
                    <h2 className="text-[32px] font-semibold text-grey-dark leading-110">Offres de stage similaires</h2>
                    <div className="mt-12 mb-18 offer-container">
                        {internshipOffers?.slice(0, 8)?.map(({ company: { picto_image, name: companyName, city, ...rest }, type, id, description, name, job_profiles, ...items }) => (
                            <Link to={`/offre/${id}`} state={{ offerId: id }} key={id} onClick={scrollToTop()} className="bg-white offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                                <div className="flex justify-between items-start">
                                    <img alt={`${companyName} image`} src={`${REACT_APP_API_URL}/assets/images/companies/${picto_image}`} className="object-contain w-12 h-12" />
                                    <span className="text-blue-dark tag-contract">{type}</span>
                                </div>

                                <div className="my-2">
                                    <h3 className="font-semibold text-[18px]">{name}</h3>
                                    <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>
                                </div>
                                <p className="opacity-50 text-md relative txt-elipsis">{description}</p>
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