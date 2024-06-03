import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from '../../Images/logo-white.svg';
import dribbble from '../../Images/Icons/dribbble.svg';
import facebook from '../../Images/Icons/facebook.svg';
import instagram from '../../Images/Icons/instagram.svg';
import linkedin from '../../Images/Icons/linkedin.svg';
import twitter from '../../Images/Icons/twitter.svg';

export default function Footer() {
    return (
        <footer className="bg-blue-night pt-16 text-white">
            <div className="container">
                <div className="flex justify-between mb-28">
                    <div className="flex flex-col w-5/12">
                        <img src={logo} alt="Bourse aux Stages" className="logo w-3/4 mb-3"></img>
                        <p className="text-white-light">Première plateforme dédiée à la recherche de <br/>stages et d’alternance qui relie automatiquement <br/>les étudiants et les entreprises.</p>
                    </div>
                    <div className="flex w-4/12 gap-12 text-white-light">
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/offres/stage">Offres</Link></li>
                            <li><Link to="/">Demandes</Link></li>
                            <li><Link to="/entreprises">Entreprises</Link></li>
                            <li><Link to="/">Etudiants</Link></li>
                        </ul>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/">Blog</Link></li>
                            <li><Link to="/">Sponsors</Link></li>
                            <li><Link to="/">Mentions légales</Link></li>
                            <li><Link to="/">Données personnelles</Link></li>
                            <li><Link to="/">Nous contacter</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-4/12 ">
                        <p className="mb-4">Étudiants, créez votre compte</p>
                        <p className="text-white-light mb-10">Recevez automatiquement par email <br/>les offres qui vous intéressent !</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                name="email"
                                className="px-4 py-3"
                                placeholder="Votre email"
                            />
                            <button type="button" className="btn-blue-dark">C'est parti</button>
                        </div>
                    </div>
                </div>
                <hr className="opacity-50 h-0.5"></hr>
                <div className="flex justify-between py-10">
                    <span className="opacity-50	">2024 @  Bourse aux Stages • Tous droits réservés</span>
                    <div className="flex justify-between w-3/12">
                        <Link to="https://dribbble.com" className="bubble-dark flex justify-center rounded-full p-2.5 w-8"><img src={dribbble}/></Link>
                        <Link to="https://facebook.com" className="bubble-dark flex justify-center rounded-full p-2.5 w-8"><img src={facebook}/></Link>
                        <Link to="https://instagram.com" className="bubble-dark flex justify-center rounded-full p-2.5 w-8"><img src={instagram}/></Link>
                        <Link to="https://linkedin.com" className="bubble-dark flex justify-center rounded-full p-2.5 w-8"><img src={linkedin}/></Link>
                        <Link to="https://twitter.com" className="bubble-dark flex justify-center rounded-full p-2.5 w-8"><img src={twitter}/></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}