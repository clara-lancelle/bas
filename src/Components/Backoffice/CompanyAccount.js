import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import Paginate from "../Paginate/Paginate";
import Sidebar from "./Sidebar/Sidebar";
import plus from "../../Images/Icons/plus-white.svg";
import CompanyOffersTable from "../Tables/CompanyOffersTable";
import pen from "../../Images/Icons/pencil.svg";
// import identityForm from "../Form/Backoffice/CompanyIdentity";

export default function CompanyAccount() {
    const { REACT_APP_API_URL } = process.env;
    const [loading, setLoading] = useState(false);
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

        }
    }, [])

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
                                        <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                            <div className="w-2/12 flex flex-col gap-y-8">
                                                {/* <img src={userData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userData.profileImage}`} className="rounded-full h-24 w-24 object-cover"></img> */}
                                                {/* <img src={userData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userData.profileImage}`} className="rounded-full h-24 w-24 object-cover"></img> */}
                                            </div>
                                            <div className="w-10/12 flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Nom : </span>{ }</p>
                                                    <p><span className="font-semibold">SIRET : </span>{ }</p>
                                                    <p><span className="font-semibold">Secteur d'activité : </span>{ }</p>
                                                    <p><span className="font-semibold">Catégorie : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Téléphone : </span>{'Non renseigné'}</p>
                                                </div>
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Adresse : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Complément d'adresse : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Ville : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Code postal : </span>{'Non renseigné'}</p>
                                                </div>
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
                                            {/* Description */}
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
                                                    <p className="font-semibold">Logo ( 300x300 pixels minimum) </p>
                                                </div>
                                                <div className="w-1/3">
                                                    <p className="font-semibold">Logo ( 800 pixels de large minimum ) </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-x-4">
                                                <div className="w-1/3">
                                                    <p className="font-semibold">Gallerie</p>
                                                </div>
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
                                                    <p><span className="font-semibold">Date de création : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Effectif  : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Chiffre d'affaire : </span>{'Non renseigné'}</p>
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
                                            <div className="flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    {/* <p><span className="font-semibold">Date de création : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Effectif  : </span>{'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Chiffre d'affaire : </span>{'Non renseigné'}</p> */}
                                                </div>
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