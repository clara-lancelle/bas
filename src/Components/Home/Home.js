import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';
import dashboardCompany from '../../Images/Home/dashboard-company.png'
import arrowRight from '../../Images/Icons/arrow-right.svg'
import JobProfiles from "../JobProfiles/JobProfiles";


export default function Home() {
    const { REACT_APP_API_URL } = process.env;
    const [offerCount, setOfferCount] = useState()
    const [companiesWithTheMostOffers, setCompaniesWithTheMostOffers] = useState([])
    const [lastOffers, setLastOffers] = useState([])
    const [lastRequests, setLastRequests] = useState([])

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/offers/count`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setOfferCount({ ...response }))
            .catch(err => console.error(err));
    }, [REACT_APP_API_URL])

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/companies/mostOffersList`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setCompaniesWithTheMostOffers(response))
            .catch(err => console.error(err));
    }, [REACT_APP_API_URL])

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/offers?order[created_at]=asc`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setLastOffers(response['hydra:member']))
            .catch(err => console.error(err));
    }, [REACT_APP_API_URL])

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/requests/last`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setLastRequests(response))
            .catch(err => console.error(err));
    }, [])

    return (
        <>
            <div className="background">
                <div className="background-children ">
                    <div className="container flex flex-col pt-20 pb-24">
                        <h1 className="text-7xl font-bold text-grey-dark leading-110">Trouver un stage <br />
                            n’aura jamais été<br />
                            <span className="text-blue-light relative hand-underline-title">aussi facile !</span>
                        </h1>
                        <p className="text-grey-dark opacity-70 mt-20 text-xl">Trouvez les offres de stage ou d’alternance près de chez vous <br />qui correspondent à votre profil et à vos attentes.</p>
                        <p className="text-grey-dark opacity-70 mt-6 text-xl"><span className="text-blue-light">{offerCount?.internship}</span> offres de <b>stages</b> | <span className="text-blue-light">{offerCount?.apprenticeship}</span> offres <b>d’alternance</b> n’attendent que vous !</p>
                    </div>
                </div>
            </div>

            <div className="bg-white m-10">
                <div className="container">
                    <h2 className="mb-8 text-black text-lg">Entreprises à la une</h2>
                    <div className="flex justify-between items-center">
                        {companiesWithTheMostOffers?.map(({ large_image, name: company, ...item }) => (
                            <img alt={`${company} image`} className="w-[18%]" key={company} src={`${REACT_APP_API_URL}/assets/images/companies/${large_image}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-18">
                <div className="container company-bg">
                    <div className="p-18 pb-0 flex justify-around">
                        <div className="flex flex-col w-1/3 text-white">
                            <h2 className="mb-6 font-semibold text-4xl leading-110">Entreprises,<br />déposez vos offres <br />gratuitement</h2>
                            <h3 className="mb-6">Vous pourrez gérer votre planning d’accueil et bénéficier de nombreux services intégrés.</h3>
                            <div className="flex items-center btn-white w-fit">
                                <Link to="/">Créer votre compte</Link>
                            </div>
                        </div>
                        <img alt="image d'un dashboard" src={dashboardCompany} />
                    </div>
                </div>
            </div>

            <div className="mb-18 container">
                <div className="flex justify-between items-baseline">
                    <h2 className="text-5xl font-semibold text-grey-dark leading-110">Dernières
                        <span className="text-blue-light"> offres</span>
                    </h2>
                    <Link to="offres/stage" className="text-blue-light font-semibold flex items-center gap-4">Toutes les offres <img src={arrowRight} className="text-blue-light" width="24px"></img></Link>
                </div>
                <div className="mt-12 mb-18 offer-container">

                    {lastOffers?.slice(0, 8)?.map(({ company: { picto_image, name: companyName, city, ...rest }, type, id, description, name, job_profiles, ...items }) => (
                        <Link to={`/offre/${id}`} state={{ offerId: id }} key={id} className="offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                            <div className="flex justify-between items-start">
                                <img alt={`${companyName} image`} src={`${REACT_APP_API_URL}/assets/images/companies/${picto_image}`} className="object-contain w-12 h-12" /> {/* Image de l'entreprise */}
                                <span className="text-blue-dark tag-contract">{type}</span> {/* Type de contrat */}
                            </div>

                            <div className="my-2">
                                <h3 className="font-semibold text-[18px]">{name}</h3>{/* Intitulé du poste */}
                                <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>{/* Nom de l'entreprise + Ville */}
                            </div>
                            <p className="opacity-50 text-md relative txt-elipsis">{description}</p>{/* Description de l'offre */}
                            <div className="flex justify-start items-center flex-wrap gap-2">
                                {job_profiles?.map((profile) => (
                                    <JobProfiles profile={profile} />
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div >

            <div className="pb-15 pt-18 last-request-container">
                <div className="container">
                    <div className="flex justify-between items-baseline">
                        <h2 className="text-5xl font-semibold text-grey-dark leading-110">Dernières
                            <span className="text-blue-light"> demandes</span>
                        </h2>
                        <Link to="#" className="text-blue-light font-semibold flex items-center gap-4">Toutes les demandes <img src={arrowRight} className="text-blue-light" width="24px"></img></Link>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-between demand-container">
                        {lastRequests?.map(({ firstname, city, calcul_age, profile_image, calcul_duration, type, id, description, requestName, name, job_profiles, start_date, end_date, ...items }) => (
                            <div key={`${name}-${id}`} className="demand-card p-6 ps-9 flex gap-6 bg-white">
                                <img alt={`${firstname, name} image de profile`} src={`${REACT_APP_API_URL}/assets/images/users/${profile_image}`} className="w-16 h-16 rounded-full" />
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-xl">{requestName}</h3>
                                    <p className="">{firstname} ({calcul_age} ans) • {city}</p>
                                    <div className="flex items-center">
                                        <span className="text-blue-dark tag-contract">{type}</span>
                                        <span className="border w-px h-full mx-2"></span>
                                        <span>Du {start_date} au {end_date} ({calcul_duration} jours)</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}