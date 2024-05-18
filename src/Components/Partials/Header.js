import React from "react";
import { Link } from "react-router-dom";
import '../../Styles/root.css';
import '../../Styles/global.css';
import './header.css';
import logo from '../../Images/logo.svg';

export default function Header() {
    return (
        <header className="p-3 pb-0 bg-grey h-20">
            <div className='flex items-center justify-between container h-full'>
                <div className="flex justify-between items-center gap-12 h-full">
                    <h1>
                        <img src={logo} alt="Bourses aux stages" className="logo"></img>
                    </h1>
                        
                    <ul className="flex justify-center items-center space-x-5 h-full">
                        <li className="h-full flex items-center relative nav-item"><Link to="#" className="nav-item__link">Accueil</Link></li>
                        <li className="h-full flex items-center relative nav-item">
                            <span className="nav-item__link">Offres</span>
                            <ul className="dropdown">
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="#">Offres de stage</Link>
                                </li>
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="#">Offres d'alternance</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="h-full flex items-center relative nav-item">
                            <span className="nav-item__link">Demandes</span>
                            <ul className="dropdown">
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="#">Demandes de stage</Link>
                                </li>
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="#">Demandes d'alternance</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="h-full flex items-center relative nav-item"><Link to="#" className="nav-item__link">Entreprises</Link></li>
                        <li className="h-full flex items-center relative nav-item"><Link to="#" className="nav-item__link">Etudiants</Link></li>
                    </ul>
                </div>
                <div className="flex items-center h-full gap-4">
                    <div className="flex items-center font-bold border-right h-3/4">
                        <Link to="/" className="text-blue-dark">Se connecter</Link>
                    </div>
                    <div className="border h-3/4"></div>
                    <div className="flex items-center btn-blue-dark h-3/4">
                        <Link to="/">Créer un compte</Link>
                    </div>
                </div>
            </div>

        </header>
    )
}