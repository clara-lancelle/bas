import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import useToken from '../useToken';

export default function SignInStudent({ closeModal, setIsAuthenticated, setUserInfo }) {
    const { REACT_APP_API_URL } = process.env;
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token, setToken, updateUserInfo } = useToken()

    const notify = (message, type) => {
        if (type === 'error') {
            toast.error(message, {
                position: "top-right"
            });
        }
        if (type === 'success') {
            toast.success(message, {
                position: "top-right"
            });
        }
    }

    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        birthdate: '',
        cellphone: '',
        address: '',
        additional_address: '',
        zipCode: '',
        city: '',
        study_level: '',
        diplome_prepare: '',
        school_name: '',
    })

    const fieldNamesInFrench = {
        gender: 'Genre',
        firstname: 'Prénom',
        name: 'Nom',
        email: 'E-mail',
        password: 'Mot de passe',
        passwordConfirm: 'Confirmation du mot de passe',
        birthdate: 'Date de naissance',
        cellphone: 'Tel. mobile',
        address: 'Adresse',
        additional_address: 'Complément d\'adresse',
        zipCode: 'Code postal',
        city: 'Ville',
        study_level: 'Niveau d\'étude',
        diplome_prepare: 'Diplôme préparé',
        school_name: 'Nom de l\'établissement',
    };

    const requiredFields = ['firstname', 'name', 'email', 'password', 'passwordConfirm', 'cellphone', 'birthdate', 'address', 'zipCode', 'city', 'study_level'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFocus = () => {
        setIsPasswordFocused(true);
    };

    const handleBlur = () => {
        setIsPasswordFocused(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = true

        // Vérification de la complétion des champs
        for (const key of requiredFields) {
            if (formData[key].trim() === '') {
                notify(`Veuillez renseigner le champ ${fieldNamesInFrench[key]}.`, 'error');
                isValid = false;
                break;
            }
        }

        // Vérifications de la correspondance des mots de passe
        if (isValid && formData.password !== formData.passwordConfirm) {
            notify('Les mots de passe ne correspondent pas.', 'error');
            isValid = false;
        }

        // Vérification du format du numéro de téléphone
        if (isValid && (!/^\d{10}$/.test(formData.cellphone) || formData.cellphone[0] !== '0')) {
            notify('Le téléphone portable doit contenir 10 chiffres et commencer par 0.', 'error');
            isValid = false;
        }

        // Vérification du code postal
        if (isValid && (!/^\d{5}$/.test(formData.zipCode))) {
            notify('Le format du code postal n\'est pas correct.', 'error');
            isValid = false;
        }

        if (isValid) {
            setLoading(true)
            try {
                const response = await fetch(`${REACT_APP_API_URL}/api/students`, {
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

                // Après la création du compte, effectuer la requête d'authentification
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
    };


    if (loading) {
        return (
            <p>Chargement ...</p>
        )
    } else {
        return (
            <>
                <form className="mt-4 flex flex-col justify-center gap-y-8 max-w-[800px] w-full" onSubmit={handleSubmit}>
                    <div className="w-full mr-4">
                        <div className="flex flex-col justify-between gap-y-8 mt-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start gap-y-2 w-1/5 required-field"><span>Genre</span>
                                    <select className="border input-apply" name={'gender'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                        <option value="Autre">Non-binaire</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start gap-y-2 w-2/5 required-field"><span>Prénom</span><input className="border input-apply" type={'text'} name={'firstname'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start gap-y-2 w-2/5 required-field"><span>Nom</span><input className="border input-apply" type={'text'} name={'name'} required onChange={handleChange}></input></label>
                            </div>
                            <label className="flex flex-col justify-start w-full gap-y-2 required-field"><span>E-mail</span><input className="border input-apply" type={'email'} name={'email'} required onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2 relative">Mot de passe
                                    {isPasswordFocused && (
                                        <div className="password-tooltip">
                                            <p>Votre mot de passe doit contenir au moins :</p>
                                            <ul className="list-disc ps-6">
                                                <li>8 caractères</li>
                                                <li>1 majuscule</li>
                                                <li>1 minuscule</li>
                                                <li>1 caractère spécial (_, -, !, ?, *, &)</li>
                                            </ul>
                                        </div>
                                    )}
                                    <input className="border input-apply" type={'password'} name={'password'} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Confirmation du mot de passe<input className="border input-apply" type={'password'} name={'passwordConfirm'} onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start w-full gap-y-2 required-field"><span>Date de naissance</span><input className="border input-apply" type={'date'} name={'birthdate'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2 required-field"><span>Tel. mobile</span><input className="border input-apply" type={'phone'} name={'cellphone'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2 required-field"><span>Adresse</span><input className="border input-apply" type={'text'} name={'address'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2">Complément d'adresse<input className="border input-apply" type={'text'} name={'additional_address'} onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2 required-field"><span>Code postal</span><input className="border input-apply" type={'text'} name={'zipCode'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2 required-field"><span>Ville</span><input className="border input-apply" type={'text'} name={'city'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start gap-y-2 w-1/4 required-field"><span>Niveau d'étude</span>
                                    <select className="border input-apply" name={'study_level'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        <option value="Bac">Baccalauréat</option>
                                        <option value="CAP, BEP">CAP, BEP</option>
                                        <option value="BTS, DUT, BUT">BTS, DUT, BUT</option>
                                        <option value="Licence">Licence</option>
                                        <option value="Master, DEA, DESS">Master, DEA, DESS</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start gap-y-2 w-1/4">Diplôme préparé
                                    <select className="border input-apply" name={'diplome_prepare'} onChange={handleChange}>
                                        <option default hidden>-</option>
                                        <option value="Bac">Baccalauréat</option>
                                        <option value="CAP, BEP">CAP, BEP</option>
                                        <option value="BTS, DUT, BUT">BTS, DUT, BUT</option>
                                        <option value="Licence">Licence</option>
                                        <option value="Master, DEA, DESS">Master, DEA, DESS</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start w-2/4 gap-y-2">Nom de l'établissement<input className="border input-apply" type={'text'} name={'school_name'} onChange={handleChange}></input></label>
                            </div>
                        </div>
                    </div>
                    <button className="btn-blue-dark w-fit self-end" type="submit">Créer mon compte</button>
                    {/* <button className="btn-blue-dark w-fit self-end">Créer mon compte</button> */}
                </form>
            </>
        )
    }
}