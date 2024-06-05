import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ariane from "../Partials/Ariane";

export default function SignIn() {
    const [offerCount, setOfferCount] = useState();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/offers/count`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setOfferCount(response['hydra:member']))
            .catch(err => console.error(err));
    })

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
        console.log()
    }

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { url: '/inscription', text: 'Inscription' },
                    ]} />
                    <div className="mt-18 text-center">
                        <h1 className="text-5xl font-bold text-gray-dark">Rejoignez <span className="relative hand-underline-title">Bourses aux Stages</span></h1>
                        <p className="text-gray-dark text-center opacity-70 mt-12 text-xl">Et tentez votre chance parmis les {offerCount} offres déja en ligne !</p>
                    </div>
                </div>
            </div>

            <div className="bg-white m-10">
                <div className="container flex flex-col items-center">
                    <h2 className="text-5xl font-semibold text-grey-dark leading-110">Inscription</h2>
                    <form className="flex flex-col justify-center gap-y-4 max-w-[400px] w-full">
                        <label className="flex flex-col justify-start">Prénom<input className="border" type={'text'} name={'firstname'} onChange={handleChange}></input></label>
                        <label className="flex flex-col justify-start">Nom<input className="border" type={'text'} name={'lastname'} onChange={handleChange}></input></label>
                        <label className="flex flex-col justify-start">E-mail<input className="border" type={'email'} name={'email'} onChange={handleChange}></input></label>
                        <label className="flex flex-col justify-start">Mot de passe<input className="border" type={'password'} name={'password'} onChange={handleChange}></input></label>
                        <button className="btn-blue-dark" onClick={handleSubmitSignIn}>Créer mon compte</button>
                    </form>
                </div>
            </div>
        </>
    )
}