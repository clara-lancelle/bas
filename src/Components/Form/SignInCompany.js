import React, {useState} from "react";
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

    <>
        <form className="mt-4 flex flex-col justify-center gap-y-8 max-w-[800px] w-full">
            <div className="flex justify-between gap-x-8">
                <label className="flex flex-col justify-start w-full gap-y-2">Prénom<input className="border input-apply" type={'text'} name={'firstname'} onChange={handleChange}></input></label>
                <label className="flex flex-col justify-start w-full gap-y-2">Nom<input className="border input-apply" type={'text'} name={'lastname'} onChange={handleChange}></input></label>
            </div>
            <div className="flex justify-between gap-x-8">
                <label className="flex flex-col justify-start w-full gap-y-2">E-mail<input className="border input-apply" type={'email'} name={'email'} onChange={handleChange}></input></label>
                <label className="flex flex-col justify-start w-full gap-y-2">Mot de passe<input className="border input-apply" type={'password'} name={'password'} onChange={handleChange}></input></label>
            </div>
            {/* <button className="btn-blue-dark" onClick={() => handleSubmitSignIn}>Créer mon compte</button> */}
            <button className="btn-blue-dark" >Créer mon compte</button>
        </form>
    </>
}