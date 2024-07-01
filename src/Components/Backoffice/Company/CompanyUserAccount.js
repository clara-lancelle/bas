import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import IdentityForm from "../../Form/Backoffice/CompanyUser/Identity"
import CompanyForm from "../../Form/Backoffice/CompanyUser/Company"
import { Link } from "react-router-dom";
import pen from "../../../Images/Icons/pencil.svg";
import cross from "../../../Images/Icons/cross-white.svg";

export default function CompanyUserAccount({ userInfo, notify }) {
    const [companyUserData, setCompanyUserData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { REACT_APP_API_URL } = process.env;
    const userToken = sessionStorage.getItem('token');
    const userEmail = sessionStorage.getItem('userEmail');

    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        name: '',
        company: [],
        position: '',
        officePhone: '',
        cellphone: '',
        email: '',
        address: '',
        additional_address: '',
        zipCode: '',
        city: '',
        profileImage: [],
    });

    const [editStates, setEditStates] = useState({
        identity: false,
        company: false,
    });

    const toggleEditState = (block) => {
        setEditStates((prevStates) => ({
            ...prevStates,
            [block]: !prevStates[block],
        }));
    };

    useEffect(() => {
        const getCompanyUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/security/company_users/?email=${encodeURIComponent(userEmail)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const companyUserResponse = data['hydra:member'][0];
                    setCompanyUserData(companyUserResponse);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        officePhone: companyUserResponse.officePhone ? companyUserResponse.officePhone : '',
                        position: companyUserResponse.position ? companyUserResponse.position : '',
                    }));
                } else {
                    console.error('Failed to fetch company user data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        setLoading(true);
        getCompanyUserData();
    }, [userEmail, userToken]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/security/users/?email=${encodeURIComponent(userEmail)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const userResponse = data['hydra:member'][0];

                    setUserData(userResponse);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        id: userResponse.id,
                        firstname: userResponse.firstname ? userResponse.firstname : '',
                        name: userResponse.name ? userResponse.name : '',
                        gender: userResponse.gender ? userResponse.gender : '',
                        email: userResponse.email ? userResponse.email : '',
                        address: userResponse.address ? userResponse.address : '',
                        additional_address: userResponse.additional_address ? userResponse.additional_address : '',
                        zipCode: userResponse.zipCode ? userResponse.zipCode : '',
                        city: userResponse.city ? userResponse.city : '',
                        cellphone: userResponse.cellphone ? userResponse.cellphone : '',
                        profileImage: userResponse.profileImage ? userResponse.profileImage : '',
                    }));
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUserData();
    }, [userEmail, userToken]);
    
    const getCompanyData = async (companyId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/companies/${encodeURIComponent(companyId)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.ok) {
                const companyResponse = await response.json();

                setCompanyData(companyResponse);
            } else {
                console.error('Failed to fetch company data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (companyUserData && companyUserData.company) {
            getCompanyData(companyUserData.company.id);
        }
    }, [companyUserData])

    useEffect(() => {
        if (companyUserData && companyData && userData) {
            setLoading(false)
        }
    }, [companyUserData, companyData, userData])
    return (
        <>
            <div className="h-full flex">
                <Sidebar userType={'administrator'} activeItem="user" />
                <div className="w-10/12">
                    {loading && (
                        <p>Chargement...</p>
                    )}
                    {!loading && userData && (
                        <>
                            <div className="mb-8 py-4 px-8 flex justify-between border-b w-full text-xl">
                                <p>Bienvenue <span className="font-semibold">{formData.firstname} {formData.name}</span></p>
                            </div>

                            <div className="px-8 py-4 flex gap-x-8">
                                <div className="w-2/3">
                                    <div className="border rounded-md mb-8">
                                        {editStates.identity ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Votre identité</h2>
                                                    <button className="btn-blue-dark flex items-baseline gap-x-2" onClick={() => toggleEditState('identity')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <IdentityForm formData={formData} setFormData={setFormData} notify={notify} toggleEditState={toggleEditState} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Votre identité</h2>
                                                    <button className="btn-blue-dark flex items-baseline gap-x-2" onClick={() => toggleEditState('identity')}><img src={pen}></img> <span>Modifier</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="w-2/12">
                                                        <img src={!formData.profileImage || formData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${formData.profileImage}`} className="rounded-full h-24 w-24 object-cover"></img>
                                                    </div>
                                                    <div className="w-10/12 flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Prénom : </span>{formData.firstname}</p>
                                                            <p><span className="font-semibold">Nom : </span>{formData.name}</p>
                                                            <p><span className="font-semibold">Genre : </span>{formData.gender}</p>
                                                            <p><span className="font-semibold">E-mail : </span>{formData.email || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Téléphone : </span>{formData.cellphone || 'Non renseigné'}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Adresse : </span>{formData.address || 'Non renseigné' || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Complément d'adresse : </span>{formData.additional_address || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Ville : </span>{formData.city || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Code postal : </span>{formData.zipCode || 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <div className="border rounded-md mb-8">
                                        {editStates.company ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Entreprise</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('company')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <CompanyForm formData={formData} setFormData={setFormData} notify={notify} toggleEditState={toggleEditState} companyName={companyData.name} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Entreprise</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('company')}><img src={pen}></img> <span>Modifier</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Entreprise : </span><Link to="/backoffice/mon-organisation" className="text-blue-dark underline">{companyData.name || 'Non renseigné'}</Link></p>
                                                            <p><span className="font-semibold">Poste : </span>{formData.position || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Téléphone professionnel : </span>{formData.officePhone || 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
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