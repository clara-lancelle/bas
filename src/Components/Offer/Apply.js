import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { EditorState, convertToRaw, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Ariane from "../Partials/Ariane";
import JobProfiles from "../JobProfiles/JobProfiles";
import RichTextEditor from '../Fields/RichTextEditor';
import SkillsList from '../Fields/SkillsList';
import LanguageLevel from '../Fields/LanguageLevel';
import ExperienceAdder from '../Fields/ExperienceAdder';
import FileUploader from '../Fields/FileUploader';
import Checkbox from '../Fields/Checkbox';
import arrow from '../../Images/Icons/arrow-right-grey-dark.svg'
import arrowBlueDark from '../../Images/Icons/arrow-blue-dark.svg'
import ImageUploader from "../Fields/ImageUploader";
import useToken from "../useToken";
import Modal from 'react-modal';
import Application from "../Application";

const LinkEditor = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={{ color: 'blue', textDecoration: 'underline' }}>
            {props.children}
        </a>
    );
};

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
        );
    }, callback);
}

const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: LinkEditor,
    },
]);

export default function OfferApply({ isAuthenticated, userInfo, setUserInfo }) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Assurez-vous que l'état est initialisé
    const [offer, setOffer] = useState([]);
    const [studyLevels, setStudyLevels] = useState([]);
    const [studyYears, setStudyYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const { REACT_APP_API_URL } = process.env;
    const { token, getToken } = useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const id = useParams()
    const [formData, setFormData] = useState({
        student_array: {
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
            personnal_website: '',
            linkedinUrl: '',
            study_years: '',
            prepared_degree: '',
            formation_name: '',
            prepared_degree: '',
            driver_license: false,
            handicap: false,
        },
        offer: `/api/offers/${id.id}`,
        school_name: '',
        motivations: '',
        profile_image: [],
        experiences_array: [],
        skills: [],
        cv: [],
        cover_letter: '',
        otherFile: [],
        
        isCreateAccount: false,
    });

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: '50%',
            bottom: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '700px',
            width: '100%',
            height: 'fit-content',
            padding: '80px 80px',
            zIndex: 2,
        },
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const checkIsAuthenticated = async () => {
        const userToken = sessionStorage.getItem('token')
        const userEmail = sessionStorage.getItem('userEmail');
        try {
            const response = await fetch(`${REACT_APP_API_URL}/api/security/students/?email=${encodeURIComponent(userEmail)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/Id+json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userData = data['hydra:member'][0];
                setFormData({
                    ...formData,
                    student_array: {
                        token: userToken,
                        gender: userData.gender || '',
                        firstname: userData.firstname || '',
                        name: userData.name || '',
                        birthdate: formatDate(userData.birthdate) || '',
                        cellphone: userData.cellphone || '',
                        email: userData.email || '',
                        emailConfirm: userData.email || '',
                        address: userData.address || '',
                        zipCode: userData.zipCode || '',
                        city: userData.city || '',
                        personnal_website: userData.personnal_website || '',
                        driver_license: false,
                        prepared_degree: userData.prepared_degree || '',
                        study_years: userData.study_years || '',    
                        school_name: userData.school_name || '',
                        visitor_status: false,
                        profile_image: userData.profile_image ? [userData.profile_image] : [],
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        if (isAuthenticated && getToken() !== '') {
            if(sessionStorage.getItem('userType') == 'CompanyUser'){
                setIsOpenModal(true)
                setIsBlocked(true)
            }else{
                checkIsAuthenticated();
            }
        } else {
            setFormData({
                ...formData,
                student_array: {
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
                    personnal_website: '',
                    driver_license: false,
                    prepared_degree: '',
                    study_years: '',    
                    school_name: '',
                    visitor_status: true,
                    profile_image: ''
                }
            });
        }
    }, [isAuthenticated, token]);

    useEffect(() => {
        const fetchStudyLevels = async () => {
            try {
                const studyLevelsResponse = await fetch(`${REACT_APP_API_URL}/api/offers/studyLevels`);
                const studyLevelsData = await studyLevelsResponse.json();
                setStudyLevels(studyLevelsData['hydra:member']);

            } catch (error) {
                console.error(error);
            }
        };

        fetchStudyLevels();

        const fetchStudyYears = async () => {
            try {
                const studyYearsResponse = await fetch(`${REACT_APP_API_URL}/api/students/StudyYears`);
                const studyYearsData = await studyYearsResponse.json();
                setStudyYears(studyYearsData['hydra:member']);

            } catch (error) {
                console.error(error);
            }
        };

        fetchStudyYears();

        const fetchData = async () => {
            try {
                const offerResponse = await fetch(`${REACT_APP_API_URL}/api/offers/${location.state.offerId}`);
                const offerData = await offerResponse.json();
                setOffer(offerData);
                setLoading(false);

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();


    }, [REACT_APP_API_URL, location.state.offerId]);

    const handleScroll = (e) => {
        console.log(e)
        if(isBlocked){
            console.log('bloqué')
            e.preventDefault();
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCheckboxChange = (name, isChecked) => {
        setFormData({
            ...formData,
            [name]: isChecked,
        });
    };

    const handleSkillsChange = (skills) => {
        const ids = skills.map(({name, id}) => id)
        setFormData({
            ...formData,
            skills: ids,
        });
    };

    const handleFileUpload = (name, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            setFormData({
            ...formData,
            [name]: reader.result,
        });
        };
        reader.readAsDataURL(file);
        
    };

    const handleLanguagesChange = (languages) => {
        setFormData({
            ...formData,
            languages: languages,
        });
    };

    const handleExperiencesChange = (experiences) => {
        console.log(experiences)
        setFormData({
            ...formData,
            experiences_array: [...experiences],
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (editorState) {
            const contentState = editorState.getCurrentContent(); // Récupération du contenu
            const rawContentState = JSON.stringify(convertToRaw(contentState));
            const htmlContent = stateToHTML(contentState); // Transformaton de l'objet en HTML
            // setFormData((prevFormData) => ({
            //     ...prevFormData,
            //     motivations: htmlContent,
            // }));
            console.log(formData)
        } else {
            console.error('EditorState is null');
        }

        // Call API en post pour envoyer les data dans la table référençant les postulations
        fetch(`${REACT_APP_API_URL}/api/applications/persistingApplication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => (console.log('response :'+ response)));

        // Une fois le call API terminé
        if (formData.isCreateAccount) {
            navigate("/finaliser-inscription", { state: { formData: formData } });
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Va vers la page précédente dans l'historique
    };

    const ariane = (offerType, offerName, offerId) => {
        if (offerType == 'stage') {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/offres/stage', text: 'Stage' },
                    { url: '/offre/stage/' + offerId, text: offerName },
                    { url: '/offre/stage/' + offerId + '/postuler', text: 'Postuler' },
                ]} />
            )
        } else {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/offres/', text: 'Alternance' },
                    { url: '/offre/' + offerId, text: offerName, state: { offerId: location.state.offerId } },
                    { url: '/offre/' + offerId + '/postuler', text: 'Postuler' },
                ]} />
            )
        }
    }

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <>
        <Application id={id}/>
            <div className="bg-light-grey" onScroll={handleScroll}>
                <div className="container flex flex-col pt-3 pb-11">
                    {ariane(offer.type, offer.name, offer.id)}
                    <div className="mt-18">
                        <div className="p-6 pr-12 border border-white-light bg-white mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <img alt={offer.company.name} src={`${process.env.REACT_APP_API_URL}/assets/images/companies/${offer.company.picto_image}`} className="w-16 h-16 object-contain"></img>
                                    <div className="ms-6">
                                        <h1 className="mb-2 font-semibold text-[32px] leading-8">{offer.name}</h1>
                                        <p className="mb-2 text-xl"><span className="font-bold">{offer.company.name}</span> • {offer.company.city} • Du {offer.start_date} au {offer.end_date} ({offer.calculatedDuration} jours)</p>
                                        <div className="flex items-center gap-x-2">
                                            <div className="pr-2 border-r">
                                                <span className="text-blue-dark tag-contract">{offer.type}</span>
                                            </div>
                                            {offer.job_profiles?.map((profile, index) => (
                                                <JobProfiles key={index} profile={profile} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-l pl-18 flex items-center text-white font-bold ">
                                    <button onClick={handleGoBack} className="flex items-center h-full px-14 py-4 border">
                                        <img src={arrow} width="32px"></img>
                                        <span className="ms-2 text-grey-dark">Retour</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className="mt-14 pb-18 border-b container flex" onSubmit={handleSubmit}>
                <div className="w-2/3 mr-16">
                    <h2 className="font-semibold text-[32px] text-grey-dark mb-5">Postulez à cette offre de stage</h2>
                    <div className="border-t py-8">
                        <p className="text-2xl text-grey-dark font-semibold mb-8">Vous êtes</p>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/5 flex flex-col">
                                <label className="required font-semibold">Genre</label>
                                <select name="gender" className="input-apply" value={formData.gender} disabled={!!formData.gender} onChange={handleChange}>
                                    <option hidden defaultValue>-</option>
                                    <option value={"Homme"} default defaultValue>Homme</option>
                                    <option value={"Femme"}>Femme</option>
                                    <option value={"Autre"}>Autre</option>
                                </select>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Prénom</label>
                                <input type="text" name="firstname" className="input-apply" placeholder="Jean" value={formData.student_array.firstname} disabled={!!formData.student_array.firstname} onChange={handleChange}></input>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Nom</label>
                                <input type="text" name="name" className="input-apply" placeholder="Dupont" value={formData.name} disabled={!!formData.name} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Date de naissance</label>
                                <input type="date" name="birthdate" className="input-apply" value={formData.birthdate} disabled={!!formData.birthdate} onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Téléphone mobile</label>
                                <input type="phone" name="cellphone" className="input-apply" placeholder="06 70 61 95 99" value={formData.cellphone} disabled={!!formData.cellphone} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Email</label>
                                <input type="email" name="email" className="input-apply" placeholder="jean.dupont@gmail.com" value={formData.email} disabled={!!formData.email} onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Confirmez votre email</label>
                                <input type="email" name="emailConfirm" className="input-apply" placeholder="jean.dupont@gmail.com" value={formData.emailConfirm} disabled={!!formData.emailConfirm} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Adresse</label>
                                <input type="text" name="address" className="input-apply" placeholder="12 Avenue du Maréchal Joffre" value={formData.address} disabled={!!formData.address} onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Complément d’adresse</label>
                                <input type="text" name="additionalAddress" className="input-apply" placeholder="Bat A, apt 7" value={formData.additionalAddress} disabled={!!formData.additionalAddress} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Code postal</label>
                                <input type="text" name="zipCode" className="input-apply" placeholder="60200" pattern="[0-9]{5}" value={formData.zipCode} disabled={!!formData.zipCode} onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Ville</label>
                                <input type="text" name="city" className="input-apply" placeholder="Compiègne" value={formData.city} disabled={!!formData.city} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Adresse de votre site web personnel</label>
                            <input type="text" name="personnal_website" className="input-apply" placeholder="https://www.jeandupont.fr" value={formData.personnal_website} disabled={!!formData.personnal_website}  onChange={handleChange}></input>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Lien vers votre page Linkedin</label>
                            <input type="text" name="linkedinUrl" className="input-apply" placeholder="https://www.linkedin.com/in/jean-dupont" value={formData.linkedinUrl} disabled={!!formData.linkedinUrl}  onChange={handleChange}></input>
                        </div>
                        <div className="flex gap-x-[52px] text-grey-dark">
                            <div className="flex gap-x-[10px]">
                                <Checkbox label={'J’ai le permis de conduire'} checked={!!formData.driver_license || false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('driver_license', isChecked)} />
                            </div>
                            <div className="flex gap-x-[10px]">
                                <Checkbox label={'J’ai une forme de handicap'} checked={!!formData.handicap || false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('handicap', isChecked)} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t py-8">
                        <p className="text-2xl text-grey-dark font-semibold mb-8">Votre situation actuelle</p>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/4 flex flex-col">
                                <label className="required font-semibold">Niveau d'études</label>
                                <select name="study_years" className="input-apply" onChange={handleChange}>
                                    <option default hidden>-</option>
                                    {studyYears.length > 0 && studyYears.map((studyYear) => (
                                        <option value={formData.study_years}>{studyYear}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label className="font-semibold">Diplôme préparé</label>
                                <select name="prepared_degree" className="input-apply" onChange={handleChange}>
                                    <option default hidden>-</option>
                                    {studyLevels.length > 0 && studyLevels.map((studyLevel) => (
                                        <option value={formData.prepared_degree}>{studyLevel}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-5/12 flex flex-col">
                                <label className="required font-semibold">Nom de l’établissement</label>
                                <input type="text" name="school_name" className="input-apply" placeholder="Lycée Saint-Vincent" value={formData.school_name} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Nom de la formation préparée</label>
                            <input type="text" name="formation_name" className="input-apply" value={formData.formation_name} placeholder="Licence générale informatique, mention développement web " onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Vos atouts & motivations pour postuler à cette offre de stage</label>
                            <RichTextEditor name="motivations" className="border-white-light border p-4 h-[150px] z-[1]" 
                            editorState={editorState} 
                            setEditorState={setEditorState}
                            placeholder="Présentez vous et mettez en avant votre parcours, vos atouts, votre personnalité, vos centres d’intérêt, attentes, etc."></RichTextEditor>
                        </div>
                        <div className="flex items-center gap-x-[10px] pt-8 border-t mb-8">
                            <Checkbox label={'Créer mon compte membre pour éviter de ressaisir ces informations la fois prochaine'} checked={false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('isCreateAccount', isChecked)} />
                        </div>
                        <button type={'submit'}className="w-full btn-blue-dark">Postuler</button>
                    </div>
                    <div className="my-8">
                        <p>En validant ce formulaire, vous confirmez que vous acceptez nos <Link to="#" state={{ offerId: offer.id }} className="text-blue-dark underline">Conditions Générales d’Utilisation</Link> et notre <Link to="#" state={{ offerId: offer.id }} className="text-blue-dark underline">politique de confidentialité</Link>.</p>
                    </div>

                    <button onClick={handleGoBack} className="flex items-center w-fit px-8 py-3 border border-grey-dark">
                        <img src={arrow} width="24px"></img>
                        <span className="ms-2 text-grey-dark font-bold">Retour</span>
                    </button>
                </div>
                <div className="w-1/3">
                    <div className="pb-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre photo</p>
                        <p className="text-grey-dark mb-4">Ajouter votre photo à votre profil est apprécié par les entreprises et augmente vos chances</p>
                        <ImageUploader name={'profile_image'} onUpload={(files) => handleFileUpload('profile_image', files)} userImage={profileImage || formData.profile_image} apiUrl={REACT_APP_API_URL}/>
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Vos compétences</p>
                        <p className="text-grey-dark mb-4">Ajoutez jusqu’à 10 compétences :</p>
                        <SkillsList name={'skills'} onSkillsChange={handleSkillsChange} />
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre pratique des langues</p>
                        <p className="text-grey-dark mb-4">Ajoutez les langues que vous pratiquez :</p>
                        <LanguageLevel name={'languageLevels'} onLanguagesChange={handleLanguagesChange} />
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre experience pro</p>
                        <p className="text-grey-dark mb-4">Stages, emplois d’été, projets personnels :</p>
                        <ExperienceAdder name={'experiences'} onExperiencesChange={handleExperiencesChange} />
                    </div>
                    <div className="pt-5 ">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">CV et autres documents</p>
                        <p className="text-grey-dark mb-8">Importez votre CV et votre lettre de motivation ou ajoutez tout document utile à votre candidature (présentation détaillée de vos projets, portfolio, etc.)</p>

                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Votre CV <span className="text-sm font-normal">(format PDF, 20 Mo max)</span></label>
                            <FileUploader label={'Importez votre CV'} accept={'application/pdf'} name={'cv'} />
                        </div>
                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Lettre de motivation <span className="text-sm font-normal">(format PDF, 20 Mo max)</span></label>
                            <FileUploader label={'Importez votre lettre de motivation'} accept={'application/pdf'} name={'cover_letter'}/>
                        </div>
                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Autre document <span className="text-sm font-normal">(format PDF ou ZIP, 50 Mo max)</span></label>
                            <FileUploader label={'Importez un autre document'} accept={'application/pdf'} name={'otherFile'}/>
                        </div>
                    </div>
                </div>
            </form>

            <Modal
                    isOpen={isOpenModal}
                    contentLabel="Accès non autorisé"
                    style={customStyles}
                >
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-semibold mb-4">Accès non autorisé</p>
                        <p className="text-center mb-2">En tant qu'administrateur d'entreprise, vous n'avez pas l'autorisation d'accéder à la postulation.</p>
                        <p className="text-center">Nous vous prions de bien vouloir créer un compte personnel afin de pouvoir postuler.</p>
                        <Link to={`/offre/${offer.id}`} state={{ offerId: offer.id }} className="self-start mt-6 text-blue-dark font-semibold flex items-center gap-x-2"><img src={arrowBlueDark} />Retourner à l'offre</Link>
                    </div>
                </Modal>
        </>
    )
}