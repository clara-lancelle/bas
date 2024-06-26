import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import SignUp from '../Form/SignUpChoice';
import SignIn from '../Form/SignIn';
import '../../Styles/root.css';
import '../../Styles/global.css';
import './header.css';
import logo from '../../Images/logo.svg';
import chevDown from '../../Images/Icons/down-chevron.svg';

Modal.setAppElement('#root');

export default function Header({ openModal, closeModal, modalIsOpen, isAuthenticated, setIsAuthenticated, userInfo, setUserInfo, handleLogout }) {
    const [modalContent, setModalContent] = useState(null);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: '50%',
            bottom: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            width: '100%',
            height: 'fit-content',
            padding: '80px 0',
        },
    };
    const openSignUpModal = () => {
        setModalContent('signUp');
        openModal();
    };

    const openSignInModal = () => {
        setModalContent('signIn');
        openModal();
    };

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
                        <div className="flex justify-end relative nav-item">
                            <img src={''}></img>
                            <div className="flex flex-col items-end">
                                <p>{userInfo.firstName} {userInfo.lastName}</p>
                                <p>{userInfo.userType}</p>
                            </div>
                            <img src={chevDown} width="18px" />
                            <ul className="dropdown">
                                <li className="h-full relative nav-item dropdown-item">
                                    <Link to="#">Mon compte</Link>
                                </li>
                                <li className="h-full relative nav-item dropdown-item">
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Déconnexion</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            {modalContent === 'signUp' && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Sign Up Modal"
                >
                    <div className="flex justify-end">
                        <button onClick={closeModal}>Fermer</button>
                    </div>
                    <SignUp closeModal={closeModal}
                        isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo} />
                </Modal>

            )}
            {modalContent === 'signIn' && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Sign In Modal"
                    style={customStyles}
                >
                    <SignIn closeModal={closeModal}
                        isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo} />
                </Modal>
            )}
        </>
    )
}