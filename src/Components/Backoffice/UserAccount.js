import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import IdentityForm from "../Form/Backoffice/StudentIdentity"
import moment from 'moment';
import { Link } from "react-router-dom";
import pen from "../../Images/Icons/pencil.svg";
import plus from "../../Images/Icons/plus-white.svg";

export default function UserAccount({ userInfo, notify }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { REACT_APP_API_URL } = process.env;
    const userToken = sessionStorage.getItem('token');
    const userEmail = sessionStorage.getItem('userEmail');

    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        name: '',
        birthdate: '',
        cellphone: '',
        email: '',
        emailConfirm: '',
        address: '',
        additionalAddress: '',
        zipCode: '',
        city: '',
        websiteUrl: '',
        linkedinUrl: '',
        graduation: '',
        graduationNext: '',
        schoolName: '',
        formationName: '',
        motivations: '',
        profileImage: [],
        cv: [],
        hasDrivingLicense: false,
        isHandicap: false,
    });

    const [editStates, setEditStates] = useState({
        identity: false,
        informations: false,
        experiences: false,
        skills: false,
        files: false,
    });

    const toggleEditState = (block) => {
        setEditStates((prevStates) => ({
            ...prevStates,
            [block]: !prevStates[block],
        }));
    };

    const formatDateForForm = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD')
    };

    const formatDateForView = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/security/students/?email=${encodeURIComponent(userEmail)}`, {
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

                setFormData({
                    ...formData,
                    gender: userResponse.gender || '',
                    firstname: userResponse.firstname || '',
                    name: userResponse.name || '',
                    birthdate: formatDateForForm(userResponse.birthdate) || '',
                    cellphone: userResponse.cellphone || '',
                    email: userResponse.email || '',
                    address: userResponse.address || '',
                    additionalAddress: userResponse.additionalAddress || '',
                    zipCode: userResponse.zipCode || '',
                    city: userResponse.city || '',
                    profileImage: userResponse.profileImage ? [userResponse.profileImage] : [],
                })
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [userEmail])

    if (!userData) {
        return <div>No user data available</div>;
    }

    return (
        <>
            {console.log(userData)}
            <div className="h-full flex">
                <Sidebar userType={'student'} activeItem="home" />
                <div className="w-10/12">
                    {loading && (
                        <p>Chargement...</p>
                    )}
                    {!loading && (
                        <>
                            <div className="mb-8 py-4 px-8 flex justify-between border-b w-full text-xl">
                                <p>Bienvenue <span className="font-semibold">{userData.firstname} {userData.name}</span></p>
                            </div>

                            <div className="px-8 py-4 flex gap-x-8">
                                <div className="w-2/3">
                                    <div className="border rounded-md mb-8">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Votre identité</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('identity')}><img src={pen}></img> <span>Modifier</span></button>
                                        </div>
                                        {editStates.identity ? (
                                            <IdentityForm formData={formData} />
                                        ) : (
                                            <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                <div className="w-2/12">
                                                    <img src={userData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userData.profileImage}`} className="rounded-full h-24 w-24 object-cover"></img>
                                                </div>
                                                <div className="w-10/12 flex items-start gap-x-16">
                                                    <div className="flex flex-col gap-y-4">
                                                        <p><span className="font-semibold">Prénom : </span>{userData.firstname}</p>
                                                        <p><span className="font-semibold">Nom : </span>{userData.name}</p>
                                                        <p><span className="font-semibold">Genre : </span>{userData.gender}</p>
                                                        <p><span className="font-semibold">Date de naissance : </span>{formatDateForView(userData.birthdate) || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">E-mail : </span>{userData.email || 'Non renseigné'}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-y-4">
                                                        <p><span className="font-semibold">Téléphone : </span>{userData.cellphone || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Adresse : </span>{userData.address || 'Non renseigné' || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Complément d'adresse : </span>{userData.additionalAddress || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Ville : </span>{userData.city || 'Non renseigné'}</p>
                                                        <p><span className="font-semibold">Code postal : </span>{userData.zipCode || 'Non renseigné'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border rounded-md">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Informations complémentaires</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('informations')}><img src={pen}></img> <span>Modifier</span></button>
                                        </div>
                                        <div className="flex justify-between items-start gap-x-6 px-8 py-6">
                                            <div className="w-10/12 flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Handicap : </span>{userData.isHandicap || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Permis de conduire : </span>{userData.isDriverLicense || 'Non renseigné'}</p>
                                                </div>
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">LinkedIn : </span>{userData.linkedinPage ? <Link to={userData.linkedinPage} className="text-blue-dark underline">Accéder</Link> : 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Lien personnel : </span>{userData.personnalWebsite ? <Link to={userData.personnalWebsite} className="text-blue-dark underline">Accéder</Link> : 'Non renseigné'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <div className="border rounded-md mb-8">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Experiences</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('experiences')}><img src={pen}></img> <span>Modifier</span></button>
                                        </div>
                                        <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                            <div className="flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Niveau d’étude : </span>{userData.studyYears || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Diplôme préparé  : </span>{userData.preparedDegree || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Nom de l’établissement : </span>{userData.schoolName || 'Non renseigné'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border rounded-md mb-8">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Compétences</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('skills')}><img src={plus}></img> <span>Ajouter</span></button>
                                        </div>
                                        <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                            <div className="flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Compétences : </span><br />{userData.cv || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Langues et niveaux : </span><br />{userData.cv || 'Non renseigné'}</p>
                                                    <p><span className="font-semibold">Expériences professionnelles : </span><br />{userData.cv || 'Non renseigné'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border rounded-md mb-8">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Fichiers</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('files')}><img src={plus}></img> <span>Ajouter</span></button>
                                        </div>
                                        <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                            <div className="flex items-start gap-x-16">
                                                <div className="flex flex-col gap-y-4">
                                                    <p><span className="font-semibold">Curriculum Vitae : </span>{userData.cv || 'Non renseigné'}</p>
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