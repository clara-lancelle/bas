import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './stageOffers.css';
import Ariane from '../Partials/Ariane';
import OffersFilter from '../Filters/OffersFilter';

export default function StageOffers() {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [jobOffers, setJobOffers] = useState([]);

    const filters = [
        {
            title: 'Profils métiers',
            options: [
                { text: 'Design', value: 'design' },
                { text: 'Commercial', value: 'commercial' },
                { text: 'Marketing', value: 'marketing' },
                { text: 'Business', value: 'business' },
                { text: 'Management', value: 'management' },
                { text: 'Finance', value: 'finance' },
                { text: 'Industrie', value: 'industrie' },
                { text: 'Informatique', value: 'informatique' }
            ]
        },
        {
            title: 'Niveau recherché',
            options: [
                { text: 'Master, DEA, DESS', value: 'master_dea_dess' },
                { text: 'Licence', value: 'licence' },
                { text: 'BTS, DUT, BUT', value: 'bts_dut_but' },
                { text: 'Bac', value: 'bac' },
                { text: 'CAP, BEP', value: 'cap_bep' }
            ]
        },
        {
            title: 'Durée',
            options: [
                { text: 'Moins de 2 mois', value: 'less_than_2_months' },
                { text: 'Entre 2 et 6 mois', value: 'between_2_and_6_months' },
                { text: 'Entre 6 et 12 mois', value: 'between_6_and_12_months' },
                { text: 'Plus de 12 mois', value: 'more_than_12_months' }
            ]
        }
    ];

    useEffect(() => {
        // Fonction pour effectuer la requête fetch avec les filtres
        const fetchFilteredOffers = async () => {
            try {
                const response = await fetch('/api/job-offers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedFilters),
                });
                const data = await response.json();
                setJobOffers(data);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };

        fetchFilteredOffers();
    }, [selectedFilters]);

    const handleFilterChange = (section, option) => {
        setSelectedFilters(prevFilters => {
            const sectionFilters = prevFilters[section] || [];
            if (sectionFilters.includes(option)) {
                return {
                    ...prevFilters,
                    [section]: sectionFilters.filter(item => item !== option),
                };
            } else {
                return {
                    ...prevFilters,
                    [section]: [...sectionFilters, option],
                };
            }
        });
    };

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { text: 'Offres' },
                        { url: '/stage/offres', text: 'Stage' },
                    ]} />
                    <div className="mt-18 text-center">
                        <h1 className="text-5xl font-bold text-grey-dark">Offres de <span className="text-blue-light relative hand-underline">stage</span></h1>
                        <p className="text-grey-dark opacity-70 mt-6 text-xl">Découvrez les offres de stages actuellement proposées par les entreprises</p>
                    </div>
                </div>
            </div>

            <div className="container my-18 flex gap-8">
                <div className="w-1/4 flex flex-col">
                    {filters.map((filter, index) => (
                        <OffersFilter
                            key={index}
                            title={filter.title}
                            options={filter.options}
                            selectedOptions={selectedFilters[filter.title] || []}
                            onChange={handleFilterChange}
                        />
                    ))}
                    <div className="mb-10">
                        <p className="font-bold">

                        </p>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col text-grey-dark">
                            <h2 className="text-[32px] font-semibold">Résultats</h2>
                            <span>offres trouvées</span>
                        </div>
                        <div>
                            <span className="text-grey-dark opacity-70">Trier par :</span>
                            <select className="border-r pr-2 font-medium">
                                <option value="date-asc">Date de publication (plus récent)</option>
                                <option value="date-desc">Date de publication (plus ancien)</option>
                                <option value="name-asc">Intitulé (A-Z)</option>
                                <option value="name-desc">Intitulé (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="p-6 border border-white-light mb-4">
                            <div className="flex justify-between">
                                <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                <div className="ms-6">
                                    <h3 className="mb-2 font-semibold text-xl">Assistant Social Media</h3>
                                    <p className="mb-2"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                    <div className="">
                                        <span className="text-blue-dark tag-contract border-r pr-2">Stage</span>
                                        {/* Affichage des profils métiers */}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center btn-blue-dark mb-4">
                                        <Link to="#">En savoir plus</Link>
                                    </div>
                                    <span className="h-2 w-full bg-lime-500 mb-2"></span>
                                    <span className="text-xs">Reste x jours pour postuler</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border border-white-light mb-4">
                            <div className="flex justify-between">
                                <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                <div className="ms-6">
                                    <h3 className="mb-2 font-semibold text-xl">Assistant Social Media</h3>
                                    <p className="mb-2"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                    <div className="">
                                        <span className="text-blue-dark tag-contract border-r pr-2">Stage</span>
                                        {/* Affichage des profils métiers */}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center btn-blue-dark mb-4">
                                        <Link to="#">En savoir plus</Link>
                                    </div>
                                    <span className="h-2 w-full bg-lime-500 mb-2"></span>
                                    <span className="text-xs">Reste x jours pour postuler</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border border-white-light mb-4">
                            <div className="flex justify-between">
                                <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                <div className="ms-6">
                                    <h3 className="mb-2 font-semibold text-xl">Assistant Social Media</h3>
                                    <p className="mb-2"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                    <div className="">
                                        <span className="text-blue-dark tag-contract border-r pr-2">Stage</span>
                                        {/* Affichage des profils métiers */}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center btn-blue-dark mb-4">
                                        <Link to="#">En savoir plus</Link>
                                    </div>
                                    <span className="h-2 w-full bg-lime-500 mb-2"></span>
                                    <span className="text-xs">Reste x jours pour postuler</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border border-white-light mb-4">
                            <div className="flex justify-between">
                                <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                <div className="ms-6">
                                    <h3 className="mb-2 font-semibold text-xl">Assistant Social Media</h3>
                                    <p className="mb-2"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                    <div className="">
                                        <span className="text-blue-dark tag-contract border-r pr-2">Stage</span>
                                        {/* Affichage des profils métiers */}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center btn-blue-dark mb-4">
                                        <Link to="#">En savoir plus</Link>
                                    </div>
                                    <span className="h-2 w-full bg-lime-500 mb-2"></span>
                                    <span className="text-xs">Reste x jours pour postuler</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}