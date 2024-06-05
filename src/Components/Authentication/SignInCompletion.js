import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Ariane from "../Partials/Ariane";

export default function SignInCompletion() {
    const location  = useLocation(); 
    const navigate  = useNavigate();
    const [userData, setUserData] = useState([]); 
    
    useEffect(() => {
        if(!location.state){
            navigate("/");
        }else{
            setUserData(location.state.formData);
        }
    }, [location.state, navigate])

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
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

    console.log(location.state.formData, userData);
    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">
                    <Ariane ariane={[
                        { url: '/', text: 'Accueil' },
                        { text: 'Compléter l\'inscription' },
                    ]} />
                    <div className="mt-18 text-center">
                        <h1 className="text-5xl font-bold text-gray-dark">Plus qu'une étape, <span className="relative hand-underline">{userData.firstname}</span></h1>
                        <p className="text-gray-dark text-center opacity-70 mt-12 text-xl">Finalisez votre inscription et postulez plus rapidement les prochaines fois !</p>
                    </div>
                </div>
            </div>

            <div className="bg-white m-10">
                <div className="container flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-grey-dark leading-110">Renseignez votre mot de passe</h2>
                    <form className="mt-4 flex flex-col justify-center gap-y-4 max-w-[400px] w-full">
                        <label className="flex flex-col justify-start gap-y-2">Mot de passe<input className="border input-apply" type={'password'} name={'password'} onChange={handleChange}></input></label>
                        <label className="flex flex-col justify-start gap-y-2">Confirmation du mot de passe<input className="border input-apply" type={'password'} name={'passwordConfirm'} onChange={handleChange}></input></label>
                        <button className="btn-blue-dark" onClick={handleSubmitSignIn}>Créer mon compte</button>
                    </form>
                </div>
            </div>
        </>
    )
}