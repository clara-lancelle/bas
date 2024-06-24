import React, { useEffect, useState } from "react";
import Ariane from "../Partials/Ariane";


export default function SignInCompany() {
    const {REACT_APP_API_URL} = process.env
    const [activities, setActivities] = useState();
    const [categories, setCategories] = useState();
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(true)

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

    const [formDataUser, setFormDataUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })

    const handleChangeUser = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formDataUser,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFocus = () => {
        setIsPasswordFocused(true);
    };
    
    const handleBlur = () => {
        setIsPasswordFocused(false);
    };

    const handleSubmitSignIn = (event) => {
        event.preventDefault();
    }

    if(loading) {
        return (
            <p>Chargement...</p>
        )
    }
    return (
        <>
            <form className="mt-16 flex flex-col justify-between gap-x-8 w-full">
                <div className="flex justify-between mb-8">
                    <div className="w-6/12 mr-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre identité</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/5"><span>Genre</span>
                                    <select className="border input-apply" name={'gender'} required onChange={handleChangeUser}>
                                        <option default hidden>-</option>
                                        <option value="male">Homme</option>
                                        <option value="female">Femme</option>
                                        <option value="other">Non-binaire</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-2/5"><span>Prénom</span><input className="border input-apply" type={'text'} name={'firstname'} required onChange={handleChangeUser}></input></label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-2/5"><span>Nom</span><input className="border input-apply" type={'text'} name={'lastname'} required onChange={handleChangeUser}></input></label>
                            </div>
                            <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>E-mail</span><input className="border input-apply" type={'email'} name={'email'} required onChange={handleChangeUser}></input></label>
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
                                                <li>1 caractère spécial (_, -, !, ?, *, &)</li>
                                            </ul>
                                        </div>
                                    )}
                                    <input className="border input-apply" type={'password'} name={'password'} required onChange={handleChangeUser} onFocus={handleFocus} onBlur={handleBlur}></input>
                                </label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Confirmation du mot de passe</span><input className="border input-apply" type={'password'} name={'passwordConfirm'} required onChange={handleChangeUser}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Fonction/poste</span><input className="border input-apply" type={'text'} name={'function'} required onChange={handleChangeUser}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2 w-1/2"><span>Tel. mobile</span><input className="border input-apply" type={'phone'} name={'phone'} required onChange={handleChangeUser}></input></label>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 ml-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre organisation</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Nom</span><input className="border input-apply" type={'text'} name={'company_name'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Siret</span><input className="border input-apply" type={'text'} name={'company_siret'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/2"><span>Secteur d'activité</span>
                                    <select className="border input-apply" name={'company_activity'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        {activities.map((activity) => (
                                            <option value={activity.id}>{activity.name}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start required-field gap-y-2 w-1/2"><span>Catégorie</span>
                                    <select className="border input-apply" name={'company_category'} required onChange={handleChange}>
                                        <option default hidden>-</option>
                                        {categories.map((category) => (
                                            <option value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Adresse</span><input className="border input-apply" type={'text'} name={'company_address'} required onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2"><span>Complément d'adresse</span><input className="border input-apply" type={'text'} name={'company_address_complement'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Code postal</span><input className="border input-apply" type={'text'} name={'company_zipcode'} required onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Ville</span><input className="border input-apply" type={'text'} name={'company_city'} required onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start required-field w-full gap-y-2"><span>Téléphone</span><input className="border input-apply" type={'text'} name={'company_phone'} required onChange={handleChange}></input></label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button className="btn-blue-dark" onClick={() => handleSubmitSignIn}>Créer mon compte</button> */}
                <button className="btn-blue-dark w-fit self-end">Créer mon compte</button>
            </form>
        </>
    )
}