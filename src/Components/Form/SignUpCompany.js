import React, { useEffect, useState } from "react";
import useToken from '../useToken';

export default function SignUpCompany({ closeModal, setIsAuthenticated, setUserInfo, notify }) {
    const { REACT_APP_API_URL } = process.env
    const { setToken, updateUserInfo } = useToken();
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState();
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/company_activities`)
            .then(response => response.json())
            .then(response => setActivities(response['hydra:member']))

        fetch(`${REACT_APP_API_URL}/api/company_categories`)
            .then(response => response.json())
            .then(response => {
                setCategories(response['hydra:member']);
                setLoading(false);
            })
    }, [REACT_APP_API_URL])

    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        position: '',
        cellphone: '',

        // Company data
        companyName: '',
        siret: '',
        activities: [],
        category: '',
        address: '',
        additional_address: '',
        zip_code: '',
        city: '',
        phone_num: '',
    })

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%#*?&])[A-Za-zÀ-ż\d@$!#%*?&]{8,}$/;

    const validatePassword = (password) => {
        return passwordPattern.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'activities') {
            setFormData({
                ...formData,
                [name]: [value],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFocus = () => {
        setIsPasswordFocused(true);
    };

    const handleBlur = () => {
        setIsPasswordFocused(false);
    };

    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        let isValid = true;

        // Vérifications de la correspondance des mots de passe
        if (isValid){
            if(formData.password !== formData.passwordConfirm) {
                notify('Les mots de passe ne correspondent pas.', 'error');
                isValid = false;
            }
            if(!validatePassword(formData.password)){
                notify('Le mot de passe doit contenir minimum 8 caractères, 1 majuscule, 1 minuscule et 1 caractère spécial.', 'error');
                isValid = false;
            }
        }

        // Vérification du format du numéro de téléphone
        if (isValid && (!/^\d{10}$/.test(formData.cellphone) || formData.cellphone[0] !== '0')) {
            notify('Le téléphone portable doit contenir 10 chiffres et commencer par 0.', 'error');
            isValid = false;
        }

        // Vérification du format du numéro de téléphone
        if (isValid && (!/^\d{10}$/.test(formData.phone_num) || formData.phone_num[0] !== '0')) {
            notify('Le téléphone portable doit contenir 10 chiffres et commencer par 0.', 'error');
            isValid = false;
        }

        if (isValid) {
            setLoading(true)
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/companies/peristingUserAndCompany`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erreur lors de la création du compte', errorData);
                    return;
                }

                const data = await response.json();
                
                const authResponse = await fetch(`${REACT_APP_API_URL}/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                if (!authResponse.ok) {
                    const authErrorData = await authResponse.json();
                    console.error('Erreur lors de l\'authentification', authErrorData);
                    return;
                }

                const authData = await authResponse.json();

                // Stocker le token JWT si l'API en retourne un
                if (authData.token) {
                    await setToken(authData.token, formData.email);
                    await updateUserInfo(setIsAuthenticated, setUserInfo)
                    setLoading(false)
                    closeModal({ message: 'Compte crée avec succès !', type: 'success' })
                }
            } catch (error) {
                console.error('Erreur réseau ou serveur', error);
            }
        }
    }
    if (loading) {
        return (
            <p>Chargement...</p>
        )
    }
    return (
        <>
            <form className="mt-16 flex flex-col justify-between gap-x-8 w-full" onSubmit={handleSubmitSignUp}>
                <div className="flex justify-between mb-8">
                    <div className="w-6/12 mr-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre identité</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/5"><span>Genre</span>
                                    <select className="border input-apply" name={'gender'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                        <option value="Autre">Non-binaire</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-2/5"><span>Prénom</span><input className="border input-apply" type={'text'} name={'firstname'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-2/5"><span>Nom</span><input className="border input-apply" type={'text'} name={'name'} required onChange={handleChange}></input></label>
                            </div>
                            <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>E-mail</span><input className="border input-apply" type={'email'} name={'email'} required onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2 relative">
                                    <span>Mot de passe</span>
                                    {isPasswordFocused && (
                                        <div className="password-tooltip">
                                            <p>Votre mot de passe doit contenir au moins :</p>
                                            <ul className="list-disc ps-6">
                                                <li>8 caractères</li>
                                                <li>1 majuscule</li>
                                                <li>1 minuscule</li>
                                                <li>1 caractère spécial (@, $, !, %, #, *, ?, &)</li>
                                            </ul>
                                        </div>
                                    )}
                                    <input className="border input-apply" type={'password'} name={'password'} required onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></input>
                                </label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Confirmation du mot de passe</span><input className="border input-apply" type={'password'} name={'passwordConfirm'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Fonction/poste</span><input className="border input-apply" type={'text'} name={'position'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Tel. mobile</span><input className="border input-apply" type={'phone'} name={'cellphone'} required onChange={handleChange}></input></label>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 ml-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre organisation</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Nom</span><input className="border input-apply" type={'text'} name={'companyName'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Siret</span><input className="border input-apply" type={'text'} name={'siret'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/2"><span>Secteur d'activité</span>
                                    <select className="border input-apply" name={'activities'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        {activities.map((activity) => (
                                            <option value={activity['@id']} key={activity.id}>{activity.name}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/2"><span>Catégorie</span>
                                    <select className="border input-apply" name={'category'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        {categories.map((category) => (
                                            <option value={category['@id']} key={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Adresse</span><input className="border input-apply" type={'text'} name={'address'} required onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2"><span>Complément d'adresse</span><input className="border input-apply" type={'text'} name={'additional_address'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Code postal</span><input className="border input-apply" type={'text'} name={'zip_code'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Ville</span><input className="border input-apply" type={'text'} name={'city'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Téléphone</span><input className="border input-apply" type={'text'} name={'phone_num'} required onChange={handleChange}></input></label>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-blue-dark w-fit self-end">Créer mon compte</button>
            </form>
        </>
    )
}