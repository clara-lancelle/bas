import React, { useState, useEffect } from "react";
import ListFilter from "./ListFilter";

export default function CompanyFiltersHandler(setters) {
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])
    const [workforce, setWorkforce] = useState([])

    const [isOpen, setIsOpen] = useState(true);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/company_activities`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setActivities(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/companies/workforceRanges`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setWorkforce(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/api/company_categories`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setCategories(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    return (
        <div className="mb-4 bloc--filters">
            <ListFilter title="Secteurs d’activité" options={activities} setter={setters.setters.setSelectedActivity} current={setters.setters.selectedActivity} />
            <ListFilter title="Catégorie" options={categories} setter={setters.setters.setSelectedCategory} current={setters.setters.selectedCategory} />
            <ListFilter title="Effectifs" options={workforce} setter={setters.setters.setSelectedWorkforce} current={setters.setters.selectedWorkforce} />
            <div className="mb-4 bloc--filters">
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleSection}>
                    <h3 className="text-lg font-semibold">Distance <span className="font-regular">- 0 à 100 km</span></h3>
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}></div>
                <input type="range" name="distance" className="w-full my-5" disabled></input>
                <p className="text-blue-dark">A moins de 50 km</p>
            </div>
        </div>
    )
}