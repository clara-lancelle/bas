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
// import identityForm from "../Form/Backoffice/CompanyIdentity";

export default function CompanyAccount() {
    const { REACT_APP_API_URL } = process.env;
    const { token } = useToken();
    const userToken = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState(false);
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
                    // setFormData({
                    //     ...formData,
                    //     gender: userResponse.gender || '',
                    //     firstname: userResponse.firstname || '',
                    //     name: userResponse.name || '',
                    //     birthdate: formatDateForForm(userResponse.birthdate) || '',
                    //     cellphone: userResponse.cellphone || '',
                    //     email: userResponse.email || '',
                    //     address: userResponse.address || '',
                    //     additionalAddress: userResponse.additionalAddress || '',
                    //     zipCode: userResponse.zipCode || '',
                    //     city: userResponse.city || '',
                    //     profileImage: userResponse.profileImage ? [userResponse.profileImage] : [],
                    // })
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
                                            {/* {editStates.identity ? (
                                            <IdentityForm formData={formData} />
                                        ) : ( */}
                                            <div className="w-full flex items-start gap-x-16 px-4 py-6">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Nom : </span>{company.name}</p>
                                                    <p><span className="font-semibold">SIRET : </span>{company.siret}</p>
                                                    <p><span className="font-semibold">Catégorie : </span>{company.category && company.category.name ? company.category.name : 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Téléphone : </span>{company.phone_num || 'Non renseigné'}</p>
                                                </div>
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Adresse : </span>{company.address || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Complément d'adresse : </span>{company.additional_address || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Ville : </span>{company.city || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Code postal : </span>{company.zip_code || 'Non renseigné'}</p>
                                                </div>
                                            </div>
                                            {/* )} */}
                                        </div>
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Description</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('description')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                {company.description}
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
                                                                <img src={`${REACT_APP_API_URL}/assets/images/companies/${image.path}`} className="w-1/5 max-h-48 object-cover px-4" />
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
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                <div className="flex items-start gap-x-16">
                                                    <div className="flex flex-col gap-y-4">
                                                        <p><span className="font-semibold">Date de création : </span>{moment(company.creation_date).format('DD/MM/YYYY') || 'Non renseigné'}</p>
                                                        <p className="flex "><span className="font-semibold">Secteur d'activité : </span>
                                                            <ul className="list-style-logo">
                                                                {company.activities && company.activities.map((activity) => (
                                                                    <li key={activity.id}>{activity.name}</li>
                                                                )) || 'Non renseigné'}
                                                            </ul>
                                                        </p>
                                                        <p><span className="font-semibold">Effectif  : </span>{company.workforce || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Chiffre d'affaire : </span>{(company.revenue / 1000000).toFixed(2) + 'M€' || 'Non renseigné'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border rounded-md mb-8">
                                            <div className="p-4 border-b w-full flex justify-between items-center">
                                                <h2 className="font-semibold text-xl">Réseaux sociaux</h2>
                                                <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('socials')}><img src={pen}></img> <span>Modifier</span></button>
                                            </div>
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                <div className="flex flex-col items-start gap-y-8">
                                                    {company.socialLinks && company.socialLinks.map((media) => (
                                                        <p><span className="font-semibold">{media.social_network.name} : </span><Link to={media.url} className="text-blue-dark underline">Accéder</Link></p>
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