import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import OffersFilter from '../Filters/OffersFilter';
import './companyList.css';

export default function CompanyList() {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [companies, setCompanies] = useState([]);

    const filters = [
        {
            title: 'Secteur d\'activité',
            options: [
                { text: 'Tous', value: 'all' },
                { text: 'Commerce', value: 'commerce' },
                { text: 'Industrie mécanique', value: 'mecanical_industry' },
                { text: 'Industrie chimique', value: 'chemical_industry' },
                { text: 'Automobile', value: 'automobile' },
                { text: 'Informatique', value: 'it' },
                { text: 'Réseau, téléphonie, FAI', value: 'network' },
                { text: 'Tourisme, sport', value: 'tourism' },
                { text: 'Transport', value: 'transport' },
                { text: 'Finances', value: 'finance' },
                { text: 'Loisirs', value: 'activities' },
                { text: 'Alimentation', value: 'alimentation' },
                { text: 'Santé, bien-être', value: 'health' },
                { text: 'Immobilier, BTP', value: 'immobilier' },
                { text: 'Média', value: 'media' },
                { text: 'Autre', value: 'other' },
            ]
        },
        {
            title: 'Catégorie',
            options: [
                { text: 'Service aux particuliers', value: 'individual_service' },
                { text: 'Service aux entreprises', value: 'business_service' },
                { text: 'Mairie, collectivité', value: 'city_hall' },
                { text: 'Association, ONG', value: 'association' },
                { text: 'Organisme d\'état', value: 'state_agency' },
                { text: 'Autres', value: 'others' }
            ]
        },
        {
            title: 'Effectifs',
            options: [
                { text: '1-9', value: 'between_1_and_9' },
                { text: '10-49', value: 'between_10_and_49' },
                { text: '50-99', value: 'between_50_and_99' },
                { text: '100-249', value: 'between_100_and_249' },
                { text: '250-999', value: 'between_250_and_999' },
                { text: '1000 et supérieur', value: 'more_than_1k' }
            ]
        }
    ];

    useEffect(() => {
        // Fonction pour effectuer la requête fetch avec les filtres
        const fetchFilteredOffers = async () => {
            try {
                const response = await fetch('/api/companies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedFilters),
                });
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
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
                        { url: '/entreprises', text: 'Entreprises' },
                    ]} />
                    <div className="mt-18 text-center">
                        <h1 className="text-5xl font-bold text-gray-dark">Liste des <span className="text-blue-light relative hand-underline">entreprises</span></h1>
                        <p className="text-gray-dark opacity-70 mt-6 text-xl">Découvrez les entreprises qui proposent des offres de stage ou d’alternance</p>
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
                            <span>entreprises trouvées</span>
                        </div>
                        <div>
                            <span className="text-gray-dark opacity-70">Trier par :</span>
                            <select className="border-r pr-2 font-medium">
                                <option value="name-asc">Nom (A-Z)</option>
                                <option value="name-desc">Nom (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8">
                        <Link to="#" className="companyCard">
                            <div className="p-6 border border-white-light">
                                <div className="flex justify-between items-start">
                                    <img alt="" src="" className="w-20 h-20 object-contain"></img>
                                    <span className="text-blue-dark tag-contract pr-2">1 stage, 2 alternances</span>
                                </div>
                                <div className="mt-7">
                                    <p className="font-semibold text-2xl mb-3">Mentalworks</p>
                                    <p className="">Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure...</p>
                                </div>
                                <div className="mt-2">
                                    <span className="px-3 py-2 border rounded-full border-green-400	text-green-400">Informatique</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="#" className="companyCard">
                            <div className="p-6 border border-white-light">
                                <div className="flex justify-between items-start">
                                    <img alt="" src="" className="w-20 h-20 object-contain"></img>
                                    <span className="text-blue-dark tag-contract pr-2">1 stage, 2 alternances</span>
                                </div>
                                <div className="mt-7">
                                    <p className="font-semibold text-2xl mb-3">Mentalworks</p>
                                    <p className="">Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure...</p>
                                </div>
                                <div className="mt-2">
                                    <span className="px-3 py-2 border rounded-full border-green-400	text-green-400">Informatique</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="#" className="companyCard">
                            <div className="p-6 border border-white-light">
                                <div className="flex justify-between items-start">
                                    <img alt="" src="" className="w-20 h-20 object-contain"></img>
                                    <span className="text-blue-dark tag-contract pr-2">1 stage, 2 alternances</span>
                                </div>
                                <div className="mt-7">
                                    <p className="font-semibold text-2xl mb-3">Mentalworks</p>
                                    <p className="">Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure...</p>
                                </div>
                                <div className="mt-2">
                                    <span className="px-3 py-2 border rounded-full border-green-400	text-green-400">Informatique</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="#" className="companyCard">
                            <div className="p-6 border border-white-light">
                                <div className="flex justify-between items-start">
                                    <img alt="" src="" className="w-20 h-20 object-contain"></img>
                                    <span className="text-blue-dark tag-contract pr-2">1 stage, 2 alternances</span>
                                </div>
                                <div className="mt-7">
                                    <p className="font-semibold text-2xl mb-3">Mentalworks</p>
                                    <p className="">Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure...</p>
                                </div>
                                <div className="mt-2">
                                    <span className="px-3 py-2 border rounded-full border-green-400	text-green-400">Informatique</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}