import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import Ariane from '../Partials/Ariane';
import Paginate from "../Paginate/Paginate";
import Sidebar from "./Sidebar/Sidebar";
import plus from "../../Images/Icons/plus-white.svg";
import CompanyOffersTable from "../Tables/CompanyOffersTable";
import pen from "../../Images/Icons/pencil.svg";
import placeholderLarge from "../../Images/Company/placeholderLarge.png";
import useToken from "../useToken";
import IdentityForm from "../Form/Backoffice/Company/Identity";
import InformationsForm from "../Form/Backoffice/Company/Informations";
import DescriptionForm from "../Form/Backoffice/Company/Description";

export default function CompanyAccount({ notify }) {
    const { REACT_APP_API_URL } = process.env;
    const { token } = useToken();
    const userToken = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState(false);
    const [formData, setFormData] = useState({});
    const [editStates, setEditStates] = useState({
        identity: false,
        description: false,
        images: false,
        informations: false,
        socials: false,
    });

    const toggleEditState = (block) => {
        setEditStates((prevStates) => ({
            ...prevStates,
            [block]: !prevStates[block],
        }));
    };

    useEffect(() => {
        const getCompanyData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/companies/96`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.ok) {
                    const companyResponse = await response.json();
                    setCompany(companyResponse);
                    setFormData({
                        ...formData,
                        category: companyResponse.category ? companyResponse.category : '',
                        name: companyResponse.name ? companyResponse.name : '',
                        siret: companyResponse.siret ? companyResponse.siret : '',
                        activities: companyResponse.activities ? companyResponse.activities : [],
                        address: companyResponse.address ? companyResponse.address : '',
                        additional_address: companyResponse.additional_address ? companyResponse.additional_address : '',
                        zip_code: companyResponse.zip_code ? companyResponse.zip_code : '',
                        city: companyResponse.city ? companyResponse.city : '',
                        phone_num: companyResponse.phone_num ? companyResponse.phone_num : '',
                        creation_date: companyResponse.creation_date ? companyResponse.creation_date : '',
                        workforce: companyResponse.workforce ? companyResponse.workforce : '',
                        revenue: companyResponse.revenue ? companyResponse.revenue : '',
                        companyImages: companyResponse.companyImages ? companyResponse.companyImages : [],
                        description: companyResponse.description ? companyResponse.description : '',
                        large_image: companyResponse.large_image ? companyResponse.large_image : '',
                        offers: companyResponse.offers ? companyResponse.offers : [],
                        picto_image: companyResponse.picto_image ? companyResponse.picto_image : '',
                        schedule: companyResponse.schedule ? companyResponse.schedule : '',
                        socialLinks: companyResponse.socialLinks ? companyResponse.socialLinks : [],
                        social_reason: companyResponse.social_reason ? companyResponse.social_reason : '',
                        workforce_range: companyResponse.workforce_range ? companyResponse.workforce_range : '',
                    })
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(true)
        getCompanyData()
        setLoading(false)

    }, [])
    if (loading) {
        return (<p>Loading ...</p>)
    } else {
        return (
            <>
                <div className="h-full flex">
                    <Sidebar userType={'administrator'} activeItem="company" />
                    <div className="w-10/12">
                        {loading && (
                            <p>Chargement...</p>
                        )}
                        {!loading && (
                            <>
                                <div className="mb-8 py-4 px-8 flex justify-between border-b">
                                    <img></img>
                                    <div className="flex items-center h-3/4">
                                        <button className="btn-blue-dark flex items-center gap-x-2"><img src={plus}></img> <span>Nouvelle offre</span></button>
                                    </div>
                                </div>

                                <div className="px-8 py-4 flex gap-x-8">
                                    <div className="w-3/5">
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Identité</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('identity')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            {editStates.identity ? (
                                                <IdentityForm formData={formData} setFormData={setFormData} toggleEditState={toggleEditState} notify={notify} />
                                            ) : (
                                                <div className="w-full flex items-start gap-x-16 px-4 py-6">
                                                    <div className="flex flex-col gap-y-4">
                                                        <p><span className="font-semibold">Nom : </span>{formData.name}</p>
                                                        <p><span className="font-semibold">SIRET : </span>{formData.siret}</p>
                                                        <p><span className="font-semibold">Catégorie : </span>{formData.category && formData.category.name ? formData.category.name : 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Téléphone : </span>{formData.phone_num || 'Non renseigné'}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-y-4">
                                                        <p><span className="font-semibold">Adresse : </span>{formData.address || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Complément d'adresse : </span>{formData.additional_address || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Ville : </span>{formData.city || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Code postal : </span>{formData.zip_code || 'Non renseigné'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Description</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('description')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                {editStates.description ? (
                                                    <DescriptionForm formData={formData} setFormData={setFormData} toggleEditState={toggleEditState} notify={notify} />
                                                ) : (
                                                    <p>{ company.description ? company.description.replace(/<[^>]+>/g, '') : 'Pas de description' }</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Images</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('images')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            <div className="flex flex-col justify-between items-start gap-y-16 px-4 py-6">
                                                <div className="flex gap-x-4 w-full">
                                                    <div className="w-1/3">
                                                        <p className="font-semibold mb-4">Logo ( 300x300 pixels minimum) </p>
                                                        {company.picto_image ? (
                                                            <img src={`${REACT_APP_API_URL}/assets/images/companies/${company.picto_image}`} className="max-h-20 object-cover" />
                                                        ) : (
                                                            <img src={placeholderLarge} className="m-w-[800px] object-cover" />
                                                        )}
                                                    </div>
                                                    <div className="w-1/3">
                                                        <p className="font-semibold mb-4">Logo ( 800 pixels de large minimum ) </p>
                                                        {company.large_image ? (
                                                            <img src={`${REACT_APP_API_URL}/assets/images/companies/${company.large_image}`} className="max-w-[300px] object-contain" />
                                                        ) : (
                                                            <img src={placeholderLarge} className="m-w-[800px] object-cover" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-full gap-y-4">
                                                    <p className="font-semibold mb-4">Galerie</p>
                                                    {company.companyImages ? (
                                                        <div className="flex">
                                                            {company.companyImages.map((image) => (
                                                                <img key={image.name} src={`${REACT_APP_API_URL}/assets/images/companies/${image.path}`} className="w-1/5 max-h-48 object-cover px-4" />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p>Aucune image dans votre gallerie</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/5">
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Informations</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('informations')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            {editStates.informations ? (
                                                <InformationsForm formData={formData} setFormData={setFormData} toggleEditState={toggleEditState} notify={notify} />
                                            ) : (
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Date de création : </span>{moment(formData.creation_date).format('DD/MM/YYYY') || 'Non renseigné'}</p>
                                                            <div className="flex "><span className="font-semibold">Secteur d'activité : </span>
                                                                <ul className="list-style-logo">
                                                                    {formData.activities && formData.activities.map((activity) => (
                                                                        <li key={activity.id}>{activity.name}</li>
                                                                    )) || 'Non renseigné'}
                                                                </ul>
                                                            </div>
                                                            <p><span className="font-semibold">Effectif  : </span>{formData.workforce || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Chiffre d'affaire : </span>{(formData.revenue / 1000000).toFixed(2) + 'M€' || 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Réseaux sociaux</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('socials')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                <div className="flex flex-col items-start gap-y-8">
                                                    {company.socialLinks && company.socialLinks.map((media) => (
                                                        <p key={media.id}><span className="font-semibold">{media.social_network.name} : </span><Link to={media.url} className="text-blue-dark underline">Accéder</Link></p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        )
    }
}