import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import IdentityForm from "../../Form/Backoffice/Student/Identity"
import ExperiencesForm from "../../Form/Backoffice/Student/Experiences"
import InformationsForm from "../../Form/Backoffice/Student/Informations"
import SkillsForm from "../../Form/Backoffice/Student/Skills"
import moment from 'moment';
import { Link } from "react-router-dom";
import pen from "../../../Images/Icons/pencil.svg";
import plus from "../../../Images/Icons/plus-white.svg";
import cross from "../../../Images/Icons/cross-white.svg";

export default function StudentAccount({ userInfo, notify }) {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { REACT_APP_API_URL } = process.env;
    const userToken = sessionStorage.getItem('token');
    const userEmail = sessionStorage.getItem('userEmail');

    const [formData, setFormData] = useState({
        firstname: '',
        name: '',
        gender: '',
        email: '',
        address: '',
        additional_address: '',
        zipCode: '',
        city: '',
        cellphone: '',
        profileImage: [],
        birthdate: '',
        driver_license: '',
        experiences: [],
        handicap: '',
        languages: [],
        linkedin_page: '',
        personnal_website: '',
        prepared_degree: '',
        school_name: '',
        skills: [],
        study_years: '',
        applications: [],
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

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true)
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
                        birthdate: formatDateForForm(userResponse.birthdate) || '',
                        driver_license: userResponse.driver_license || '',
                        handicap: userResponse.handicap || '',
                        linkedin_page: userResponse.linkedin_page || '',
                        personnal_website: userResponse.personnal_website || '',
                        prepared_degree: userResponse.prepared_degree || '',
                        school_name: userResponse.school_name || '',
                        study_years: userResponse.study_years || '',
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
    useEffect(() => {
        const getUserData = async () => {
            if (formData.id) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${formData.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const studentResponse = data;
                        console.log(studentResponse)
                        setUserData({ ...userData, ...studentResponse });
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            applications: studentResponse.applications || [],
                            experiences: studentResponse.experiences || [],
                            languages: studentResponse.languages || [],
                            skills: studentResponse.skills || [],
                            iri: studentResponse['@id'] || [],
                        }));
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false)
                }
            }
        };
        getUserData();
    }, [userEmail, userToken, formData.id]);

    if (!userData && !loading) {
        return <div>No user data available</div>;
    }
    if (loading) {
        return <p>Chargement</p>;
    }

    return (
        <>
            <div className="h-full flex">
                {console.log(formData, userData)}
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
                                        {editStates.identity ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Votre identité</h2>
                                                    <button className="btn-blue-dark flex items-baseline gap-x-2" onClick={() => toggleEditState('identity')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <IdentityForm formData={formData} setFormData={setFormData} notify={notify} userId={formData.id} toggleEditState={toggleEditState} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Votre identité</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('identity')}><img src={pen}></img> <span>Modifier</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="w-2/12">
                                                        <img src={userData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userData.profileImage}`} className="rounded-full h-24 w-24 object-cover"></img>
                                                    </div>
                                                    <div className="w-10/12 flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Prénom : </span>{formData.firstname}</p>
                                                            <p><span className="font-semibold">Nom : </span>{formData.name}</p>
                                                            <p><span className="font-semibold">Genre : </span>{formData.gender}</p>
                                                            <p><span className="font-semibold">Date de naissance : </span>{formatDateForView(formData.birthdate) || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">E-mail : </span>{formData.email || 'Non renseigné'}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Téléphone : </span>{formData.cellphone || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Adresse : </span>{formData.address || 'Non renseigné' || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Complément d'adresse : </span>{formData.additionalAddress || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Ville : </span>{formData.city || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Code postal : </span>{formData.zipCode || 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="border rounded-md">
                                        {editStates.informations ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Informations complémentaires</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('informations')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <InformationsForm formData={formData} setFormData={setFormData} notify={notify} userId={formData.id} toggleEditState={toggleEditState} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Informations complémentaires</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('informations')}><img src={pen}></img> <span>Modifier</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-8 py-6">
                                                    <div className="w-10/12 flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Handicap : </span>{(formData.handicap ? 'Oui' : 'Non') || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Permis de conduire : </span>{(formData.driver_license ? 'Oui' : 'Non') || 'Non renseigné'}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">LinkedIn : </span>{formData.linkedin_page ? <Link to={formData.linkedin_page} className="text-blue-dark underline">Accéder</Link> : 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Lien personnel : </span>{formData.personnal_website ? <Link to={formData.personnal_website} className="text-blue-dark underline">Accéder</Link> : 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <div className="border rounded-md mb-8">
                                        {editStates.experiences ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Experiences</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('experiences')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <ExperiencesForm formData={formData} setFormData={setFormData} notify={notify} userId={formData.id} toggleEditState={toggleEditState} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Experiences</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('experiences')}><img src={pen}></img> <span>Modifier</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <p><span className="font-semibold">Niveau d’étude : </span>{formData.study_years || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Diplôme préparé  : </span>{formData.prepared_degree || 'Non renseigné'}</p>
                                                            <p><span className="font-semibold">Nom de l’établissement : </span>{formData.school_name || 'Non renseigné'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="border rounded-md mb-8">
                                        {editStates.skills ? (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Compétences</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('skills')}><img src={cross}></img> <span>Annuler</span></button>
                                                </div>
                                                <SkillsForm formData={formData} setFormData={setFormData} notify={notify} userId={formData.id} toggleEditState={toggleEditState} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-4 border-b w-full flex justify-between items-center">
                                                    <h2 className="font-semibold text-xl">Compétences</h2>
                                                    <button className="btn-blue-dark flex items-center gap-x-2" onClick={() => toggleEditState('skills')}><img src={plus}></img> <span>Ajouter</span></button>
                                                </div>
                                                <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                                    <div className="flex items-start gap-x-16">
                                                        <div className="flex flex-col gap-y-4">
                                                            <div className="flex flex-col gap-x-8">
                                                                <span className="font-semibold">Compétences : </span><br />
                                                                {formData.skills ? (
                                                                    <ul className="ps-8 list-style-logo">
                                                                        {formData.skills.map((skill, index) => (
                                                                            <li key={index}>{skill.name}</li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <span>Non renseigné</span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col  gap-x-8">
                                                                <span className="font-semibold">Langues et niveaux : </span><br />
                                                                {formData.languages ? (
                                                                    <ul className="ps-8 list-style-logo">
                                                                        {formData.languages.map((language, index) => (
                                                                            <li key={index}>{language.name} ({language.level})</li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <span>Non renseigné</span>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col  gap-x-8">
                                                                <span className="font-semibold">Expériences professionnelles : </span><br />
                                                                {formData.experiences ? (
                                                                    <ul className="ps-8 list-style-logo">
                                                                        {formData.experiences.map((experience, index) => (
                                                                            <li key={index}>{experience.type}:  {experience.company} ({experience.year})</li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <span>Non renseigné</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
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