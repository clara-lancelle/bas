import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../Styles/root.css';
import '../../Styles/global.css';
import './header.css';
import logo from '../../Images/logo.svg';
import chevDown from '../../Images/Icons/down-chevron.svg';
import useToken from '../useToken';

export default function Header({ isAuthenticated, userInfo, handleLogout, openSignUpModal, openSignInModal }) {
    const {token, getToken} = useToken();
    const { REACT_APP_API_URL } = process.env;
    let userType = userInfo.userType ? userInfo.userType == 'CompanyUser' ? 'Administrateur' : 'Étudiant' : '';

    return (
        <>
            <header className="p-3 pb-0 bg-grey h-20">
                <div className='flex items-center justify-between container h-full'>
                    <div className="flex justify-between items-center gap-12 h-full">
                        <img src={logo} alt="Bourses aux stages" className="logo"></img>

                        <ul className="flex justify-center items-center space-x-5 h-full">
                            <li className="h-full flex items-center relative nav-item"><Link to="/" className="nav-item__link">Accueil</Link></li>
                            <li className="h-full flex items-center relative nav-item">
                                <span className="nav-item__link">Offres</span>
                                <ul className="dropdown">
                                    <li className="h-full relative nav-item dropdown-item">
                                        <Link to="/offres/stage">Offres de stage</Link>
                                    </li>
                                    <li className="h-full relative nav-item dropdown-item">
                                        <Link to="/offres/alternance">Offres d'alternance</Link>
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
                            <li className="h-full flex items-center relative nav-item"><Link to="/entreprises" className="nav-item__link">Entreprises</Link></li>
                            <li className="h-full flex items-center relative nav-item"><Link to="#" className="nav-item__link">Etudiants</Link></li>
                        </ul>
                    </div>
                    {!isAuthenticated && (
                        <div className="flex items-center h-full gap-4">
                            <div className="flex items-center font-bold border-right h-3/4">
                                <button className="text-blue-dark" onClick={openSignInModal}>Se connecter</button>
                            </div>
                            <div className="border h-3/4"></div>
                            <div className="flex items-center h-3/4">
                                <button className="btn-blue-dark" onClick={openSignUpModal}>Créer un compte</button>
                            </div>
                        </div>
                    )}
                    {isAuthenticated && (
                        <div className="flex justify-end relative nav-item h-full pb-2 gap-x-2">
                            <img src={userInfo.userImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userInfo.userImage}`} className="rounded-full h-full w-16 object-cover"></img>
                            <div className="flex flex-col items-end justify-center">
                                <p>{userInfo.firstName} {userInfo.lastName}</p>
                                <p>{userType}</p>
                            </div>
                            <img src={chevDown} width="18px"/>
                            <ul className="dropdown">
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="/backoffice/mon-compte">Mon compte</Link>
                                </li>
                                {userInfo.userType == 'CompanyUser' && (
                                    <li className="h-full relative nav-item dropdown-item">
                                    <Link to="/backoffice/mon-organisation">Mon organisation</Link>
                                </li>
                                )}

                                <li className="h-full relative nav-item dropdown-item">
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Déconnexion</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}