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
        fetch(`${process.env.REACT_APP_API_URL}/api/companies/workforce_ranges`, {
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
        </div>
    )
}