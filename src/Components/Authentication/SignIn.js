import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Ariane from "../Partials/Ariane";
import SignInChoice from "../Form/SignInChoice";
import SignInStudent from "../Form/SignInStudent";
import SignInCompany from "../Form/SignInCompany";

export default function SignIn() {
    const [offerCount, setOfferCount] = useState();
    const [formChoice, setFormChoice] = useState(false);
    const [companyForm, setCompanyForm] = useState(false);
    const [studentForm, setStudentForm] = useState(false);
    const location = useLocation();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(location.state)
        fetch(`${process.env.REACT_APP_API_URL}/api/offers/count`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => setOfferCount(response['hydra:member']))
            .catch(err => console.error(err));

        if (location.state) {
            if (location.state.type == 'company') {
                setCompanyForm(true);
                setFormChoice(false)
                setStudentForm(false)
            } else {
                setCompanyForm(false);
                setFormChoice(false)
                setStudentForm(true);
            }
        } else {
            setFormChoice(true);
        }
    }, [location.state])

    // const handleSignInChoice = (type) => {
    //     if (type == "company") {
    //         setCompanyForm(true)
    //     } else {
    //         setStudentForm(true)

    //     }
    //     console.log(type)
    // }

    if (formChoice) {
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
                            <p className="text-gray-dark text-center opacity-70 mt-12 text-xl">Et tentez votre chance parmi les {offerCount} offres déjà en ligne !</p>
                        </div>
                    </div>
                </div>

                <SignInChoice />
            </>
        );
    }

    if (studentForm) {
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
                            <p className="text-gray-dark text-center opacity-70 mt-12 text-xl">Et tentez votre chance parmi les {offerCount} offres déjà en ligne !</p>
                        </div>
                    </div>
                </div>
                <SignInStudent />
            </>
        );
    }

    if (companyForm) {
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
                            <p className="text-gray-dark text-center opacity-70 mt-12 text-xl">Et tentez votre chance parmi les {offerCount} offres déjà en ligne !</p>
                        </div>
                    </div>
                </div>
                {/* <SignInCompany /> */}
            </>
        );
    }

    return null;
}