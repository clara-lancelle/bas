import React from "react";
import Ariane from "../Partials/Ariane";
import { Link } from "react-router-dom";
import companyBlue from "../../Images/company-blue.jpg"
import studentBlue from "../../Images/student-blue.jpg"

export default function SignInChoice() {
    return (
        <>
            

            <div className="bg-white m-10">
                <div className="container flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-grey-dark leading-110">Vous êtes</h2>
                    <div className="w-full mt-16 flex justify-between gap-x-8">
                        <Link to="/inscription" state={{type: 'company'}} className="w-1/2 border py-6 px-20 rounded-xl flex flex-col justify-start shadow-sm hover:shadow-lg duration-300">
                            <h3 className="text-center text-2xl font-semibold w-full">Une entreprise</h3>
                            <img src={companyBlue} className="w-2/3 opacity-80 self-center"></img>
                            <ul className="list-style-logo flex flex-col items-start ">
                                <li>Poster des offres</li>
                                <li>Augmentez votre visibilité </li>
                                <li>Trouvez votre prochain stagiaire ou alternant</li>
                            </ul>
                        </Link>
                        <Link to="/inscription" state={{type: 'student'}} className="w-1/2 border py-6 px-20 rounded-xl flex flex-col justify-start shadow-sm hover:shadow-lg duration-300">
                            <h3 className="text-center text-2xl font-semibold w-full">Un(e) étudiant(e)</h3>
                            <img src={studentBlue} className="w-2/3 opacity-80 self-center"></img>
                            <ul className="list-style-logo flex flex-col items-start ">
                                <li>Faites vous remarquer</li>
                                <li>Postulez à des offres</li>
                                <li>Construisez votre futur !</li>
                            </ul>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}