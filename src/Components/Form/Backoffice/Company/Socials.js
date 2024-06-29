import React, { useEffect, useState, useRef } from "react";

export default function CompanySocialsForm({ formData, setFormData, toggleEditState }) {
    const { REACT_APP_API_URL } = process.env;
    const [loading, setLoading] = useState(false);
    const [socials, setSocials] = useState([]);
    const [availableSocials, setAvailableSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/social_networks`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    // const SocialsData = data['hydra:member'];
                    // setSocials(SocialsData);
                    // setAvailableSocials(SocialsData);
                } else {
                    console.error('Failed to fetch Socials');
                }
            } catch (error) {
                console.error('Error fetching Socials:', error);
            }
        };
        setLoading(true)
        fetchSocials();
        setLoading(false)
    }, []);

    return (
        <>
        {console.log(socials)}
        </>
    )
}