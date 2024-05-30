import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from "../Partials/Ariane";
import share from "../../Images/Icons/share.svg";

export default function OfferDetail() {
    const ariane = (offerType, offerName, offerId) => {
        if (offerType == 'stage') {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/stage/offres', text: 'Stage' },
                    { url: '/stage/offre/' + offerId, text: offerName },
                ]} />
            )
        } else {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/alternance/offres', text: 'Alternance' },
                    { url: '/alternance/offre/' + offerId, text: offerName },
                ]} />
            )
        }
    }

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">

                    {ariane('stages', 'Assistant Web Marketing', 1)}
                    <div className="mt-18">
                        <div className="p-6 border border-white-light bg-white mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                    <div className="ms-6">
                                        <h1 className="mb-2 font-semibold text-[32px] leading-8">Assistant Social Media</h1>
                                        <p className="mb-2 text-xl"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                        <div className="flex">
                                            <div className="pr-2 border-r">
                                                <span className="text-blue-dark tag-contract">Stage</span>
                                            </div>
                                            {/* Affichage des profils métiers */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-x-8">
                                    <div className="border-r pr-8">
                                        <Link to="#" className="flex items-center h-full"><img src={share} width="32px"></img></Link>
                                    </div>

                                    <div className="flex items-center text-white font-bold bg-blue-dark">
                                        <Link to="#" className="px-14 py-4">Postuler</Link>
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
                        <h2 className="font-semibold mb-4 text-[32px]">A propos de ce stage</h2>
                        <p>Mentalworks est à la recherche d'un(e) assistant(e) en marketing des médias sociaux pour l'aider à gérer ses réseaux en ligne. Vous serez responsable de la surveillance de nos canaux de médias sociaux, de la création de contenu, de la recherche de moyens efficaces d'engager la communauté et d'inciter les autres à s'engager sur nos canaux.</p>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-4 text-[32px]">Missions</h2>
                        <ul className="list-img-check">
                            <li>Engagement de la communauté pour s'assurer qu'elle est soutenue et activement représentée en ligne</li>
                            <li>Engagement de la communauté pour s'assurer qu'elle est soutenue et activement représentée en ligne</li>
                            <li>Engagement de la communauté pour s'assurer qu'elle est soutenue et activement représentée en ligne</li>
                            <li>Engagement de la communauté pour s'assurer qu'elle est soutenue et activement représentée en ligne</li>
                        </ul>
                    </div>
                    <div className="mb-10">
                        <h2 className="font-semibold mb-4 text-[32px]">Profil recherché</h2>
                        <ul className="list-img-check">
                            <li>Vous êtes passionné par le digital et pratiquez les principaux réseaux sociaux</li>
                            <li>Vous êtes passionné par le digital et pratiquez les principaux réseaux sociaux</li>
                            <li>Vous êtes passionné par le digital et pratiquez les principaux réseaux sociaux</li>
                            <li>Vous êtes passionné par le digital et pratiquez les principaux réseaux sociaux</li>
                        </ul>
                    </div>

                    <div className="flex items-center text-white font-bold bg-blue-dark w-fit py-4 px-10">
                        <Link to="#">Postuler</Link>
                    </div>
                </div>

                <div className="w-1/3">
                    <div className="pb-10 border-b">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Échéances</h2>
                        <div className="p-4 flex flex-col bg-light-grey mb-6">
                            <span className="mb-2">Reste 3 jours pour postuler</span>
                            <div className="flex">
                                <span className="h-2 w-20 bg-red-500"></span>
                                <span className="h-2 w-20 bg-slate-300"></span>
                                <span className="h-2 w-20 bg-slate-300"></span>
                                <span className="h-2 w-20 bg-slate-300"></span>
                                <span className="h-2 w-20 bg-slate-300"></span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-6 justify-between">
                            <div className="flex justify-between">
                                <span>Postuler avant le</span>
                                <span className="font-semibold text-blue-dark">17 mai 2024</span> {/* Date max postulation */}
                            </div>
                            <div className="flex justify-between">
                                <span>Offre publiée le</span>
                                <span className="font-semibold text-blue-dark">15 avril 2024</span> {/* Date de publication / Created_at */}
                            </div>
                            <div className="flex justify-between">
                                <span>Type d’offre</span>
                                <span className="font-semibold text-blue-dark">Stage</span> {/* Condition d'affichage selon le type d'offre */}
                            </div>
                            <div className="flex justify-between">
                                <span>Gratification</span>
                                <span className="font-semibold text-blue-dark">Non obligatoire</span> {/* ?? */}
                            </div>
                            <div className="flex justify-between">
                                <span>Candidatures déposées</span>
                                <span className="font-semibold text-blue-dark">6</span> {/* Get des candidatures pour l'id de l'offre actuelle  */}
                            </div>
                        </div>
                    </div>

                    <div className="py-10 border-b">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Profils métiers</h2>
                        <div className="flex justify-start gap-x-2">
                            {/* Liste des profils métiers de l'offre / A voir pour en faire un composant a réutiliser partout */}
                        </div>
                    </div>

                    <div className="py-10 border-b">
                        <h2 className="text-blue-dark text-2xl font-semibold mb-6">Compétences recherchées</h2>
                        <div className="flex justify-start gap-x-2">
                            {/* Liste des compétences recherchées de l'offre / A voir pour en faire un composant a réutiliser partout */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-18 flex ">
                <div className="w-1/2">
                    {/* <img src={mwLogo} className="max-w-full mb-8" /> */}
                    <div className="mb-8 flex flex-col">
                        <p className="font-bold mb-4">{/* Présentation courte de l'entreprise */}
                            Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure.
                        </p>
                        <p>{/* Description de l'entreprise / Coupée au point le plus proche après la limite */}
                            Créé par des anciens de l’UTC et de l’INSSET, notre culture et notre modèle atypique est un atout et une force qui nous permet de couvrir l’intégralité de la chaîne de valeurs pour concevoir et réaliser un site internet ou une application web de A à Z : audit, conseil, ergonomie, création et webdesign, développement front et back, maintenance corrective/évolutive, accompagnement webmarketing et même des formations expertes.
                        </p>
                    </div>
                    {/* <Link to="#" className="text-blue-dark flex items-center font-semibold mt-6">En savoir plus sur  <img src={arrowRight} className="ms-2" /></Link> */}
                </div>
            </div>
        </>
    )
}