import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EditorState, convertToRaw, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Ariane from "../Partials/Ariane";
import JobProfiles from "../JobProfiles/JobProfiles";
import RichTextEditor from '../Fields/RichTextEditor';
import SkillsList from '../Fields/SkillsList';
import LanguageLevelList from '../Fields/LanguageLevelList';
import ExperienceAdderList from '../Fields/ExperienceAdderList';
import FileUploader from '../Fields/FileUploader';
import Checkbox from '../Fields/Checkbox';
import share from "../../Images/Icons/share.svg";
import arrow from '../../Images/Icons/arrow-right-grey-dark.svg'
import mwLogo from '../../Images/Company/mw-logo-large.png'
import ImageUploader from "../Fields/ImageUploader";

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

export default function OfferApply() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Assurez-vous que l'état est initialisé
    const [offer, setOffer] = useState([]);
    const [studyLevels, setStudyLevels] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const { REACT_APP_API_URL } = process.env;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchStudyLevels = async () => {
            try {
                const studyLevelsResponse = await fetch(`${REACT_APP_API_URL}/api/offers/studyLevels`);
                const studyLevelsData = await studyLevelsResponse.json();
                setStudyLevels(studyLevelsData['hydra:member']);

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchStudyLevels();
        
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
    
    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        mobilePhone: '',
        email: '',
        emailConfirm: '',
        address: '',
        addressComplement: '',
        zipcode: '',
        city: '',
        websiteUrl: '',
        linkedinUrl: '',
        graduation: '',
        graduationNext: '',
        schoolName: '',
        formationName: '',
        motivations: '',
        profilePicture: [],
        experiences: [],
        cv: [],
        motivationLetter: [],
        otherFile: [],
        hasDrivingLicense: false,
        isHandicap: false,
        isCreateAccount: false,
    });

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
        setFormData({
            ...formData,
            skills: skills,
        });
    };

    const handleFileUpload = (name, files) => {
        setFormData({
            ...formData,
            [name]: files,
        });
    };

    const handleLanguagesChange = (languages) => {
        setFormData({
            ...formData,
            languages: languages,
        });
    };

    const handleExperiencesChange = (experiences) => {
        setFormData({
            ...formData,
            experiences: experiences,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (editorState) {
            const contentState = editorState.getCurrentContent(); // Récupération du contenu
            const rawContentState = JSON.stringify(convertToRaw(contentState));
            const htmlContent = stateToHTML(contentState); // Transformaton de l'objet en HTML
            setFormData((prevFormData) => ({
                ...prevFormData,
                motivations: htmlContent,
            }));
        } else {
            console.error('EditorState is null');
        }

        // Call API en post pour envoyer les data dans la table référençant les postulations
        // console.log(formData)
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
            <div className="bg-light-grey">
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
                                <select name="gender" className="input-apply" onChange={handleChange}>
                                    <option hidden defaultValue>-</option>
                                    <option value={"Homme"} default defaultValue>Homme</option>
                                    <option value={"Femme"}>Femme</option>
                                    <option value={"Autre"}>Autre</option>
                                </select>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Prénom</label>
                                <input type="text" name="firstname" className="input-apply" placeholder="Jean" onChange={handleChange}></input>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Nom</label>
                                <input type="text" name="lastname" className="input-apply" placeholder="Dupont" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Date de naissance</label>
                                <input type="date" name="birthdate" className="input-apply" onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Téléphone mobile</label>
                                <input type="phone" name="mobilePhone" className="input-apply" placeholder="06 70 61 95 99" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Email</label>
                                <input type="email" name="email" className="input-apply" placeholder="jean.dupont@gmail.com" onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Confirmez votre email</label>
                                <input type="email" name="emailConfirm" className="input-apply" placeholder="jean.dupont@gmail.com" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Adresse</label>
                                <input type="text" name="address" className="input-apply" placeholder="12 Avenue du Maréchal Joffre" onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Complément d’adresse</label>
                                <input type="text" name="addressComplement" className="input-apply" placeholder="Bat A, apt 7" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Code postal</label>
                                <input type="text" name="zipcode" className="input-apply" placeholder="60200" pattern="[0-9]{5}" onChange={handleChange}></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Ville</label>
                                <input type="text" name="city" className="input-apply" placeholder="Compiègne" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Adresse de votre site web personnel</label>
                            <input type="text" name="websiteUrl" className="input-apply" placeholder="https://www.jeandupont.fr" onChange={handleChange}></input>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Lien vers votre page Linkedin</label>
                            <input type="text" name="linkedinUrl" className="input-apply" placeholder="https://www.linkedin.com/in/jean-dupont" onChange={handleChange}></input>
                        </div>
                        <div className="flex gap-x-[52px] text-grey-dark">
                            <div className="flex gap-x-[10px]">
                                <Checkbox label={'J’ai le permis de conduire'} checked={false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('hasDrivingLicense', isChecked)} />
                            </div>
                            <div className="flex gap-x-[10px]">
                                <Checkbox label={'J’ai une forme de handicap'} checked={false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('isHandicap', isChecked)} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t py-8">
                        <p className="text-2xl text-grey-dark font-semibold mb-8">Votre situation actuelle</p>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/4 flex flex-col">
                                <label className="required font-semibold">Niveau d'études</label>
                                <select name="graduation" className="input-apply" onChange={handleChange}>
                                    <option default hidden>-</option>
                                    {studyLevels.length > 0 && studyLevels.map((studyLevel) => (
                                        <option value={studyLevel}>{studyLevel}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label className="font-semibold">Diplôme préparé</label>
                                <select name="graduationNext" className="input-apply" onChange={handleChange}>
                                    <option default hidden>-</option>
                                    {studyLevels.length > 0 && studyLevels.map((studyLevel) => (
                                        <option value={studyLevel}>{studyLevel}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-5/12 flex flex-col">
                                <label className="required font-semibold">Nom de l’établissement</label>
                                <input type="text" name="schoolName" className="input-apply" placeholder="Lycée Saint-Vincent" onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Nom de la formation préparée</label>
                            <input type="text" name="formationName" className="input-apply" placeholder="Licence générale informatique, mention développement web " onChange={handleChange}></input>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Vos atouts & motivations pour postuler à cette offre de stage</label>
                            <RichTextEditor name="motivations" className="border-white-light border p-4 h-[150px]" editorState={editorState} setEditorState={setEditorState}></RichTextEditor>
                        </div>
                        <div className="flex items-center gap-x-[10px] pt-8 border-t mb-8">
                            <Checkbox label={'Créer mon compte membre pour éviter de ressaisir ces informations la fois prochaine'} checked={false} activeCheckEvent={true} onChange={(isChecked) => handleCheckboxChange('isCreateAccount', isChecked)} />
                        </div>
                        <button className="w-full btn-blue-dark">Postuler</button>
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
                        <ImageUploader name={'profilePicture'} onUpload={(files) => handleFileUpload('profilePicture', files)} />
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre compétences</p>
                        <p className="text-grey-dark mb-4">Ajoutez jusqu’à 10 compétences :</p>
                        <SkillsList name={'skills'} onSkillsChange={handleSkillsChange} />
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre pratique des langues</p>
                        <p className="text-grey-dark mb-4">Ajoutez les langues que vous pratiquez :</p>
                        <LanguageLevelList name={'languageLevels'} onLanguagesChange={handleLanguagesChange} />
                    </div>
                    <div className="py-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre experience pro</p>
                        <p className="text-grey-dark mb-4">Stages, emplois d’été, projets personnels :</p>
                        <ExperienceAdderList name={'experiences'} onExperiencesChange={handleExperiencesChange} />
                    </div>
                    <div className="pt-5 ">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">CV et autres documents</p>
                        <p className="text-grey-dark mb-8">Importez votre CV et votre lettre de motivation ou ajoutez tout document utile à votre candidature (présentation détaillée de vos projets, portfolio, etc.)</p>

                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Votre CV <span className="text-sm font-normal">(format PDF, 20 Mo max)</span></label>
                            <FileUploader label={'Importez votre CV'} accept={'application/pdf'} name={'cv'} onUpload={(files) => handleFileUpload('cv', files)} />
                        </div>
                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Lettre de motivation <span className="text-sm font-normal">(format PDF, 20 Mo max)</span></label>
                            <FileUploader label={'Importez votre lettre de motivation'} accept={'application/pdf'} name={'motivationLetter'} onUpload={(files) => handleFileUpload('motivationLetter', files)} />
                        </div>
                        <div className="flex flex-col gap-y-2 mb-4">
                            <label className="font-semibold">Autre document <span className="text-sm font-normal">(format PDF ou ZIP, 50 Mo max)</span></label>
                            <FileUploader label={'Importez un autre document'} accept={'application/pdf'} name={'otherFile'} onUpload={(files) => handleFileUpload('otherFile', files)} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}