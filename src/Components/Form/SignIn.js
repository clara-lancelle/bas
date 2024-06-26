import React, { useEffect, useState } from "react";
import useToken from "../useToken";

export default function SignIn({ closeModal, setIsAuthenticated, setUserInfo }) {
    const { REACT_APP_API_URL } = process.env;
    const { token, setToken, updateUserInfo } = useToken()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.email !== '' && formData.password !== '') {
            setLoading(true)
            try {
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
                    closeModal({ message: 'Vous êtes connecté(e) !', type: 'success' })
                }
            } catch (error) {
                console.error('Erreur réseau ou serveur', error);
            }
        }
    }

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <h2 className="font-semibold text-xl">Se connecter</h2>
            <form className="mt-4 flex flex-col justify-center gap-y-8 max-w-[400px] w-full" onSubmit={handleSubmit}>
                <div className="w-full mr-4">
                    <div className="flex flex-col justify-between gap-y-8 mt-8">
                        <label className="flex flex-col justify-start w-full gap-y-2">E-mail
                            <input className="border input-apply w-full" type={'email'} name={'email'} required onChange={handleChange}></input></label>
                        <label className="flex flex-col justify-start w-full gap-y-2 w-1/2 relative">Mot de passe
                            <input className="border input-apply w-full" type={'password'} name={'password'} onChange={handleChange}></input></label>
                        <button className="btn-blue-dark w-fit self-end" type="submit">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>
    )
}