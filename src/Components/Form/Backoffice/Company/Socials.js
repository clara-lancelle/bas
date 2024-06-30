import React, { useEffect, useState, useRef } from "react";
import SocialsField from '../../../Fields/Backoffice/Socials'

export default function CompanySocialsForm({ formData, setFormData, toggleEditState }) {
    const { REACT_APP_API_URL } = process.env;
    const [loading, setLoading] = useState(false);
    const [socials, setSocials] = useState([]);
    const [availableSocials, setAvailableSocials] = useState([]);
    const [newFormData, setNewFormData] = useState({ socialLinks: [] });
    const [newFormDataWithNames, setNewFormDataWithNames] = useState({ socialLinks: [] });
    const [initialSelectedSocials, setInitialSelectedSocials] = useState([]);
    const userToken = sessionStorage.getItem('token');
    const userCompanyId = sessionStorage.getItem('userCompanyId');

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/social_networks`);
                if (response.ok) {
                    const data = await response.json();
                    const socialsData = data['hydra:member'];
                    setSocials(socialsData);
                    setAvailableSocials(socialsData);
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

    const prepareInitialSelectedSocials = async () => {
        if (formData.socialLinks && formData.socialLinks.length > 0) {
            if (formData.socialLinks[0].id) {
                const selectedSocials = formData.socialLinks.map(link => ({
                    socialNetwork: link.social_network['@id'],
                    url: link.url,
                    socialName: link.social_network.name,
                }));
                setInitialSelectedSocials(selectedSocials);
            }else{
                const selectedSocials = formData.socialLinks.map(link => ({
                    socialNetwork: link.social_network,
                    url: link.url,
                    socialName: link.name,
                }));
                setInitialSelectedSocials(selectedSocials);
            }
        }
    };
    useEffect(() => {
        prepareInitialSelectedSocials();
    }, [formData, toggleEditState]);

    const handleSocialsChange = (socials) => {
        setNewFormData((prevFormData) => ({
            ...prevFormData,
            socialLinks: socials.map(social => ({ social_network: social.socialNetwork, url: social.url }))
        }));
        setNewFormDataWithNames((prevFormData) => ({
            ...prevFormData,
            socialLinks: socials.map(social => ({ social_network: social.socialNetwork, url: social.url, name: social.socialName }))
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendDataToAPI(newFormData);
        await updateFormData(newFormDataWithNames)
        await prepareInitialSelectedSocials();
        toggleEditState('socials');
    }

    const sendDataToAPI = async (newData) => {
        const response = await fetch(`${REACT_APP_API_URL}/api/security/companies/${userCompanyId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur lors de la mise à jour des réseaux sociaux de l\'entreprise', errorData);
            return;
        }

        const data = await response.json();
    }

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    return (
        <>
            <form className="px-4 py-6" onSubmit={handleSubmit}>
                <SocialsField socials={socials ? socials : []} onSocialsChange={handleSocialsChange} initialSelectedSocials={initialSelectedSocials} prepareInitialSelectedSocials={prepareInitialSelectedSocials} />
                <div className="w-full flex justify-end">
                    <button type="submit" className="btn-blue-dark">Enregistrer</button>
                </div>
            </form>
        </>
    )
}