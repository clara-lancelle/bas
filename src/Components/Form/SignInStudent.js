import React, { useEffect, useState } from "react";
import Ariane from "../Partials/Ariane";


export default function SignInStudent() {
    const {REACT_APP_API_URL} = process.env;

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`${REACT_APP_API_URL}/api/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json'  // Ajustez le Content-Type ici
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur lors de la création du compte', errorData);
                return;
            }
    
            const data = await response.json();
            console.log('Compte créé avec succès', data);
    
            // Après la création du compte, effectuez la requête d'authentification
            const authResponse = await fetch(`${REACT_APP_API_URL}/api/auth` , {
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
            console.log('Authentification réussie', authData);
    
            // Stocker le token JWT si l'API en retourne un
            if (authData.token) {
                localStorage.setItem('jwtToken', authData.token);
            }
        } catch (error) {
            console.error('Erreur réseau ou serveur', error);
        }
    };
    

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
                            <label className="flex flex-col justify-start w-full gap-y-2 w-1/2">Mot de passe<input className="border input-apply" type={'password'} name={'password'} onChange={handleChange}></input></label>
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