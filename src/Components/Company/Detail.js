import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
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
import './companyList.css';


export default function CompanyDetail() {

    const [internshipOffers, setInternshipOffers] = useState([])
    const { REACT_APP_API_URL } = process.env;
    
    const pictures = [
        { url: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/32/84/f9/3284f9e7838751c0618841a0a93a241b4889f83f.jpg?rule=classified-1200x800-webp' },
        { url: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/32/84/f9/3284f9e7838751c0618841a0a93a241b4889f83f.jpg?rule=classified-1200x800-webp' },
        { url: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/32/84/f9/3284f9e7838751c0618841a0a93a241b4889f83f.jpg?rule=classified-1200x800-webp' },
        { url: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/32/84/f9/3284f9e7838751c0618841a0a93a241b4889f83f.jpg?rule=classified-1200x800-webp' },
        { url: 'https://img.leboncoin.fr/api/v1/lbcpb1/images/32/84/f9/3284f9e7838751c0618841a0a93a241b4889f83f.jpg?rule=classified-1200x800-webp' },
    ]

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/offers/last`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setInternshipOffers(response))
            .catch(err => console.error(err));
    }, [])

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { text: 'Entreprises' },
                        { url: '/entreprise/', text: 'Entreprises' }, // Id et nom de l'entreprise
                    ]} />
                    <div className="mt-8 mb-6">
                        <h1 className="text-5xl font-bold text-grey-dark">Mentalworks</h1>
                        <p className="bg-white px-3 py-2 mt-4 text-blue-dark font-semibold flex items-center w-fit rounded-md"><span>mentalworks.fr</span><img src={arrowRight} className="ms-4 text-blue-dark" width="16px" style={{ fill: '#4640DE' }}></img></p>
                    </div>
                    <div className="flex gap-10 justify-start">
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={check} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Activité</span>
                                <span className="font-semibold">Informatique</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={fire} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Ancienneté</span>
                                <span className="font-semibold">24 ans</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={users} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Effectifs</span>
                                <span className="font-semibold">22</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={cash} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Chiffre d'affaire</span>
                                <span className="font-semibold">1,2 M€</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white rounded-3xl flex items-center justify-center p-3">
                                <img src={mapPoint} width="24" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>Situation</span>
                                <span className="font-semibold">Compiègne (60200)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-14 container flex ">
                <div className="w-2/3 mr-16">
                    <div className="mb-6">
                        <h2 className="font-semibold mb-4 text-3xl">Présentation</h2>
                        <p className="font-bold mb-4">
                            Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure.
                        </p>
                        <p>Mentalworks représente une nouvelle génération : celle des agences digitales technologiques. Notre particularité est d’intégrer à la fois une agence web et e-marketing (conseil stratégique, SEO/SEA/CM) mais aussi une SSII/ESN composée de développeurs spécialisés pour couvrir toutes les technologies et répondre à tous les besoins: créer ou développer des applications métiers ou applis mobiles/tablettes, relier ou synchroniser un site e-commerce avec un ERP/CRM existant ou avec tout autre système d’information, etc.
                            <br /><br />
                            Experts du framework PHP Symfony et .NET Nous avons développé une gamme de solutions d'entreprises sur étagère en mode licence ou abonnement (SaaS) : smart INTRANET/EXTRANET, smart CRM/ERP, smart CSE, smart ASSO et Smart MAIRIES. N'hésitez pas à nous contacter pour vous les présenter et organiser une démonstration.
                            <br /><br />
                            Une équipe pluridisciplinaire composée d’experts imagine et conçoit avec vous votre projet. Vous êtes conseillé et accompagné du début à la fin. Notre valeur ajoutée : écouter, échanger, comprendre, analyser, être force de proposition, penser digital et multicanal mais aussi et surtout optimiser l’expérience utilisateur pour tirer le meilleur potentiel de chaque support .
                            <br /><br />
                            Nous travaillons avec tous nos clients avec la même implication et le même engagement. Quel que soit votre besoin et votre budget, partenaires de votre réussite, nous trouverons ensemble la solution pour développer une stratégie digitale gagnante. La vôtre.
                        </p>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-6 text-3xl">Réseaux sociaux</h2>
                        <div className="flex gap-4 justify-start">
                            <Link to="#" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={linkedin} width="24px"></img>
                                <span>linkedin.com</span>
                            </Link>
                            <Link to="#" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={twitter} width="24px"></img>
                                <span>twitter.com</span>
                            </Link>
                            <Link to="#" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
                                <img src={facebook} width="24px"></img>
                                <span>facebook.com</span>
                            </Link>
                            <Link to="#" className="border border-blue-dark p-2 flex gap-3 text-blue-dark items-center">
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
                    <img src={mwLogo} className="max-w-full mb-10" />
                    <div className="mb-4">
                        <h2 className="text-[32px] font-semibold mb-4 text-grey-dark">Situation</h2>
                        <div className="flex flex-col opacity-70">
                            <span className="font-bold">Mentalworks</span>{/* Nom de l'entreprise */}
                            <span>41 rue Irène Joliot Curie</span>{/* Adresse de l'entreprise */}
                            <span>Bâtiment Millenium</span>{/* Comp. adresse de l'entreprise */}
                            <span>60610 Lacroix Saint-Ouen</span>{/* CP + Ville de l'entreprise */}
                        </div>
                    </div>
                    <div className="pb-4 mb-10 border-b">
                        <Link to="#" className="text-blue-dark flex items-center font-semibold mb-2">Voir sur la carte <img src={arrowRight} className="ms-2" /></Link>
                        {/* Composant map une fois l'adresse obtenue */}
                    </div>
                    <div className="mb-10 pb-10 border-b">
                        <h2 className="text-[32px] font-semibold mb-4 text-grey-dark">Nous joindre</h2>
                        <div className="flex flex-col opacity-70">
                            <span>Téléphone: </span>{/* Téléphone */}
                            <span>Du lundi au vendredi de 8h30 à 18h30</span>{/* Horaires */}
                        </div>
                        <Link to="#" className="text-blue-dark flex items-center font-semibold mt-6">Nous envoyer un message <img src={arrowRight} className="ms-2" /></Link>
                    </div>
                    <div className="mb-10 pb-10 flex flex-col gap-y-6">
                        <h2 className="text-[32px] font-semibold text-grey-dark">Vos contacts</h2>
                        <div className="flex flex-col gap-y-2 pb-2 border-b">
                            <span className="font-bold  opacity-70">Directeur des ressources humaines</span>{/* Poste */}
                            <p className="opacity-70">Olivier <span className="uppercase">SALESSE</span></p>{/* prénom NOM */}
                            <div className="flex gap-4">
                                <Link to="#"><img src={linkedin} width="24px" /></Link>
                                <Link to="#"><img src={mail} width="24px" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 pb-20 pt-18 last-request-container">
                <div className="container">
                    <h2 className="text-[32px] font-semibold text-grey-dark leading-110">Offres de stage proposées</h2>
                    <div className="mt-12 mb-18 offer-container">
                        {internshipOffers?.map(({ picto_image, type, id, companyName, description, city, name, job_profiles, ...items }) => (
                            <div key={id} className="offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                                <div>
                                    <h3 className="font-semibold text-[18px]">{name}</h3>{/* Intitulé du poste */}
                                    <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>{/* Durée du stage */}
                                </div>
                                <p className="opacity-50 text-md relative txt-elipsis">{description}</p>{/* Description de l'offre (raccourci a l'espace)*/}
                                <div className="flex justify-between">
                                    {job_profiles.map((profile) => (
                                        <p key={profile.name} style={{ color: profile.color }}> {profile.name}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-[32px] font-semibold text-grey-dark leading-110 mt-13">Offres d'alternance proposées</h2>
                    <div className="mt-12 mb-18 offer-container">
                        {internshipOffers?.map(({ picto_image, type, id, companyName, description, city, name, job_profiles, ...items }) => (
                            <div key={id} className="offer-card border h-[283px] overflow-hidden justify-between flex flex-col">
                                <div>
                                    <h3 className="font-semibold text-[18px]">{name}</h3>{/* Intitulé du poste */}
                                    <p className="offer-informations text-md text-wrap">{companyName} • {city}</p>{/* Durée du stage */}
                                </div>
                                <p className="opacity-50 text-md relative txt-elipsis">{description}</p>{/* Description de l'offre (raccourci a l'espace)*/}
                                <div className="flex justify-between">
                                    {job_profiles.map((profile) => (
                                        <p key={profile.name} style={{ color: profile.color }}> {profile.name}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </>
    )
}