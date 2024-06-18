import React, { useState } from "react";
import Ariane from "../Partials/Ariane";


export default function SignInStudent() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmitSignIn = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <form className="mt-16 flex flex-col justify-between gap-x-8 w-full">
                <div className="flex justify-between mb-8">
                    <div className="w-6/12 mr-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre identité</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start gap-y-2 w-1/5">Genre
                                    <select className="border input-apply" name={'gender'} onChange={handleChange}>
                                        <option default hidden>-</option>
                                        <option value="male">Homme</option>
                                        <option value="female">Femme</option>
                                        <option value="other">Non-binaire</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start gap-y-2 w-2/5">Prénom<input className="border input-apply" type={'text'} name={'firstname'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start gap-y-2 w-2/5">Nom<input className="border input-apply" type={'text'} name={'lastname'} onChange={handleChange}></input></label>
                            </div>
                            <label className="flex flex-col justify-start w-full gap-y-2">E-mail<input className="border input-apply" type={'email'} name={'email'} onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Mot de passe<input className="border input-apply" type={'password'} name={'password'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Confirmation du mot de passe<input className="border input-apply" type={'password'} name={'passwordConfirm'} onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-4">
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Fonction/poste<input className="border input-apply" type={'text'} name={'function'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Tel. mobile<input className="border input-apply" type={'phone'} name={'phone'} onChange={handleChange}></input></label>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 ml-4">
                        <p className="text-xl font-semibold text-grey-dark leading-110 text-center mb-8">Votre organisation</p>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2">Nom<input className="border input-apply" type={'text'} name={'company_name'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2">Siret<input className="border input-apply" type={'text'} name={'company_siret'} onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start gap-y-2 w-1/2">Secteur d'activité
                                    <select className="border input-apply" name={'company_activity'} onChange={handleChange}>
                                        <option default hidden>-</option>
                                    </select>
                                </label>
                                <label className="flex flex-col justify-start gap-y-2 w-1/2">Catégorie
                                    <select className="border input-apply" name={'company_category'} onChange={handleChange}>
                                        <option default hidden>-</option>
                                    </select>
                                </label>
                            </div>
                            <label className="flex flex-col justify-start w-full gap-y-2">Adresse<input className="border input-apply" type={'text'} name={'company_address'} onChange={handleChange}></input></label>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2">Complément d'adresse<input className="border input-apply" type={'text'} name={'company_address_complement'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2">Code postal<input className="border input-apply" type={'text'} name={'company_zipcode'} onChange={handleChange}></input></label>
                            </div>
                            <div className="flex justify-between gap-x-3">
                                <label className="flex flex-col justify-start w-full gap-y-2">Ville<input className="border input-apply" type={'text'} name={'company_city'} onChange={handleChange}></input></label>
                                <label className="flex flex-col justify-start w-full gap-y-2">Téléphone<input className="border input-apply" type={'text'} name={'company_phone'} onChange={handleChange}></input></label>
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