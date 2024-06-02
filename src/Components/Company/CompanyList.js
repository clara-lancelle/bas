import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import CompanyFiltersHandler from "../Filters/CompanyFiltersHandler";
import './companyList.css';

export default function CompanyList() {
    const [selectedActivity, setSelectedActivity] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedWorkforce, setSelectedWorkforce] = useState()
    const [selectedSort, setSelectedSort] = useState(1)
    const [companies, setCompanies] = useState([]);

    const sorter = [
        ['name', 'asc'],
        ['name', 'desc'],
    ]
    const setters = {
        setSelectedActivity, selectedActivity, selectedCategory, setSelectedCategory, selectedWorkforce, setSelectedWorkforce

    }

    useEffect(() => {
        let [name, value] = sorter[(selectedSort - 1)]
        let a = ''
        let c = ''
        let w = ''
        if (selectedWorkforce) {
            w = `&workforce_range=${selectedWorkforce}`
        }
        if (selectedActivity) {
            a = `&activity=${selectedActivity}`
        }
        if (selectedCategory) {
            c = `&category=${selectedCategory}`
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/companies?${w}${a}${c}&order[${name}]=${value}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setCompanies(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL, selectedSort, selectedActivity, selectedCategory, selectedWorkforce])


    // const filters = [
    //     {
    //         title: 'Secteur d\'activité',
    //         options: [
    //             { text: 'Tous', value: 'all' },
    //             { text: 'Commerce', value: 'commerce' },
    //             { text: 'Industrie mécanique', value: 'mecanical_industry' },
    //             { text: 'Industrie chimique', value: 'chemical_industry' },
    //             { text: 'Automobile', value: 'automobile' },
    //             { text: 'Informatique', value: 'it' },
    //             { text: 'Réseau, téléphonie, FAI', value: 'network' },
    //             { text: 'Tourisme, sport', value: 'tourism' },
    //             { text: 'Transport', value: 'transport' },
    //             { text: 'Finances', value: 'finance' },
    //             { text: 'Loisirs', value: 'activities' },
    //             { text: 'Alimentation', value: 'alimentation' },
    //             { text: 'Santé, bien-être', value: 'health' },
    //             { text: 'Immobilier, BTP', value: 'immobilier' },
    //             { text: 'Média', value: 'media' },
    //             { text: 'Autre', value: 'other' },
    //         ]
    //     },
    //     {
    //         title: 'Catégorie',
    //         options: [
    //             { text: 'Service aux particuliers', value: 'individual_service' },
    //             { text: 'Service aux entreprises', value: 'business_service' },
    //             { text: 'Mairie, collectivité', value: 'city_hall' },
    //             { text: 'Association, ONG', value: 'association' },
    //             { text: 'Organisme d\'état', value: 'state_agency' },
    //             { text: 'Autres', value: 'others' }
    //         ]
    //     },
    //     {
    //         title: 'Effectifs',
    //         options: [
    //             { text: '1-9', value: 'between_1_and_9' },
    //             { text: '10-49', value: 'between_10_and_49' },
    //             { text: '50-99', value: 'between_50_and_99' },
    //             { text: '100-249', value: 'between_100_and_249' },
    //             { text: '250-999', value: 'between_250_and_999' },
    //             { text: '1000 et supérieur', value: 'more_than_1k' }
    //         ]
    //     }
    // ];

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { url: '/entreprises', text: 'Entreprises' },
                    ]} />
                    <div className="mt-18 text-center">
                        <h1 className="text-5xl font-bold text-grey-dark">Liste des <span className="text-blue-light relative hand-underline">entreprises</span></h1>
                        <p className="text-grey-dark opacity-70 mt-6 text-xl">Découvrez les entreprises qui proposent des offres de stage ou d’alternance</p>
                    </div>
                </div>
            </div>

            <div className="container my-18 flex gap-8">
                <div className="w-1/4 flex flex-col">
                    <CompanyFiltersHandler setters={setters} />
                    <div className="mb-10">
                        <p className="font-bold">

                        </p>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col text-grey-dark">
                            <h2 className="text-[32px] font-semibold">Résultats</h2>
                            <span>{companies.length > 1 && `${companies.length} entreprises trouvées` || `${companies.length} entreprise trouvée`} </span>
                        </div>
                        <div>
                            <span className="text-grey-dark opacity-70">Trier par :</span>
                            <select className="border-r pr-2 font-medium" value={selectedSort}
                                onChange={e => (setSelectedSort(e.target.value))}>
                                <option value={1}>Nom (A-Z)</option>
                                <option value={2}>Nom (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {companies?.map(({ name, city, picto_image, id, description, offers, activity, ...items }) => (
                            <Link to={`/companies/${id}`} className="companyCard" key={name + id}>
                                <div className="p-6 border border-white-light h-full">
                                    <div className="flex justify-between items-start">
                                        <img alt={`${name} image`} src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${picto_image}`} className="w-20 h-20 object-contain" />
                                        {(offers.filter(offer => offer.type === 'Stage').length || offers.filter(offer => offer.type === 'Alternance').length) && (
                                            <span className="text-blue-dark tag-contract pr-2">
                                                {offers.filter(offer => offer.type === 'Stage').length && offers.filter(offer => offer.type === 'Alternance').length && (
                                                    `${offers.filter(offer => offer.type === 'Stage').length} stages, ${offers.filter(offer => offer.type === 'Alternance').length} alternances`
                                                ) || offers.filter(offer => offer.type === 'Stage').length && (
                                                    `${offers.filter(offer => offer.type === 'Stage').length} stages`
                                                ) || offers.filter(offer => offer.type === 'Alternance').length && (
                                                    `${offers.filter(offer => offer.type === 'Alternance').length} alternances`
                                                )}
                                            </span>
                                        ) || ""}
                                    </div>
                                    <div className="mt-7">
                                        <p className="font-semibold h-[80px] text-2xl mb-3">{name}</p>
                                        <p className="mb-3 h-[100px] overflow-hidden">{description}</p>
                                    </div>
                                    <div className="mt-2">
                                        <span className="px-3 py-2 border rounded-full border-green-400	text-green-400">{activity.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}