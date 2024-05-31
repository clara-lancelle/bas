import React, { useState, useEffect } from "react";
import OffersFilter from "./OffersFilter";

export default function OfferFiltersHandler(setters) {
    const [jobProfiles, setJobProfiles] = useState([])
    const [studyLevels, setStudyLevels] = useState([])
    const [durations, setDurations] = useState([])

    const [isOpen, setIsOpen] = useState(true);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/job_profiles`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setJobProfiles(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/offers/studyLevels`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setStudyLevels(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/api/offers/durations`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => (
                setDurations(response['hydra:member'])
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])



    return (
        <div className="mb-4 bloc--filters">
            <OffersFilter title="Profils métiers" options={jobProfiles} setter={setters.setters.setSelectedJobProfile} current={setters.setters.selectedJobProfile} />
            <OffersFilter title="Niveau recherché" options={studyLevels} setter={setters.setters.setSelectedStudyLevel} current={setters.setters.selectedStudyLevel} />
            <OffersFilter title="Durée" options={durations} setter={setters.setters.setSelectedDuration} current={setters.setters.selectedDuration} />
        </div>
    )
}