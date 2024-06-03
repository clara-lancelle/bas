import React, { useState, useEffect } from "react";
import ListFilter from "./ListFilter";

export default function OfferFiltersHandler(setters) {
    const [jobProfiles, setJobProfiles] = useState([])
    const [studyLevels, setStudyLevels] = useState([])
    const [durations, setDurations] = useState([])
    const [distance, setDistance] = useState([])

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
            <ListFilter title="Profils métiers" options={jobProfiles} setter={setters.setters.setSelectedJobProfile} current={setters.setters.selectedJobProfile} />
            <ListFilter title="Niveau recherché" options={studyLevels} setter={setters.setters.setSelectedStudyLevel} current={setters.setters.selectedStudyLevel} />
            <ListFilter title="Durée" options={durations} setter={setters.setters.setSelectedDuration} current={setters.setters.selectedDuration} />
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