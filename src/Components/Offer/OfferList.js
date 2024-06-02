import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import OfferFiltersHandler from "../Filters/OfferFiltersHandler";

export default function OfferList({ type }) {
    const [selectedJobProfile, setSelectedJobProfile] = useState()
    const [selectedStudyLevel, setSelectedStudyLevel] = useState()
    const [selectedDuration, setSelectedDuration] = useState()
    const [selectedSort, setSelectedSort] = useState(1)
    const [offers, setOffers] = useState([]);
    const sorter = [
        ['created_at', 'asc'],
        ['created_at', 'desc'],
        ['name', 'asc'],
        ['name', 'desc'],
        ['application_limit_date', 'asc']
    ]
    const setters = {
        selectedJobProfile, setSelectedJobProfile, selectedStudyLevel, setSelectedStudyLevel, selectedDuration, setSelectedDuration

    }

    useEffect(() => {
        let [name, value] = sorter[(selectedSort - 1)]
        let d = ''
        let jp = ''
        let sl = ''
        if (selectedDuration) {
            d = `&duration=${selectedDuration}`
        }
        if (selectedJobProfile) {
            jp = `&job_profiles=${selectedJobProfile}`
        }
        if (selectedStudyLevel) {
            sl = `&study_level=${selectedStudyLevel}`
        }
        console.log(`${process.env.REACT_APP_API_URL}/api/offers?type=${type}${d}${jp}${sl}&order[${name}]=${value}`)

        fetch(`${process.env.REACT_APP_API_URL}/api/offers?type=${type}${d}${jp}${sl}&order[${name}]=${value}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setOffers(response['hydra:member']))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL, selectedSort, selectedJobProfile, selectedDuration, selectedStudyLevel, type])

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
                        <h1 className="text-5xl font-bold text-gray-dark">Offres {type == 'Alternance' ? 'd\'' : 'de'} <span className="text-blue-light relative hand-underline">{type}</span></h1>
                        <p className="text-gray-dark opacity-70 mt-6 text-xl">Découvrez les offres de stages actuellement proposées par les entreprises</p>
                    </div>
                </div>
            </div>

            <div className="container my-18 flex gap-8">
                <div className="w-1/4 flex flex-col">
                    <OfferFiltersHandler setters={setters} />
                    <div className="mb-10">
                        <p className="font-bold">

                        </p>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-col text-grey-dark">
                            <h2 className="text-[32px] font-semibold">Résultats</h2>
                            <span>{offers.length} offres trouvées</span>
                        </div>
                        <div>
                            <span className="text-gray-dark opacity-70">Trier par :</span>
                            <select className="border-r pr-2 font-medium" value={selectedSort} // ...force the select's value to match the state variable...
                                onChange={e => (setSelectedSort(e.target.value))}>
                                <option value={1}>Date de publication (plus récente)</option>
                                <option value={2}>Date de publication (plus ancienne)</option>
                                <option value={3}>Intitulé (A-Z)</option>
                                <option value={4}>Intitulé (Z-A)</option>
                                <option value={5}>Nombre de jours restant pour postuler (croissant)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {offers?.map(({ company: { name: companyName, city, picto_image }, id, name, start_date, end_date, job_profiles, calculatedLimitDays, calculatedDuration, ...items }) => (
                            <div key={name + id} className="p-6 border border-white-light mb-4">
                                <div className="flex justify-between">
                                    <img alt={`${companyName} image`} src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${picto_image}`} className="w-16 h-16 object-contain"></img>
                                    <div className="ms-6">
                                        <h3 className="mb-2 font-semibold text-xl">{name}</h3>
                                        <p className="mb-2"><span className="font-bold">{companyName}</span> • {city} • Du {start_date} au {end_date} ({calculatedDuration} jours)</p>
                                        <div className="flex items-center">
                                            <span className="text-blue-dark tag-contract border-r pr-2">{type}</span>
                                            <div className="flex justify-between ml-1">
                                                {job_profiles?.map((profile) => (
                                                    <p key={profile.name} className="mx-1" style={{ color: profile.color }}>{profile.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center btn-blue-dark mb-4">
                                            <Link to="#">En savoir plus</Link>
                                        </div>
                                        <span className="h-2 w-full bg-lime-500 mb-2"></span>
                                        <span className="text-xs">Reste {calculatedLimitDays} jours pour postuler</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}