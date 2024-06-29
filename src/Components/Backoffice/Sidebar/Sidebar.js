import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import companyBlue from "../../../Images/Icons/company-blue.svg"
import usersBlue from "../../../Images/Icons/users-blue.svg"
import messageBlue from "../../../Images/Icons/message-blue.svg"
import offersBlue from "../../../Images/Icons/offers-blue.svg"
import settingsBlue from "../../../Images/Icons/settings-blue.svg"
import companyGrey from "../../../Images/Icons/company-grey.svg"
import usersGrey from "../../../Images/Icons/users-grey.svg"
import messageGrey from "../../../Images/Icons/message-grey.svg"
import offersGrey from "../../../Images/Icons/offers-grey.svg"
import settingsGrey from "../../../Images/Icons/settings-grey.svg"
import homeBlue from "../../../Images/Icons/home-blue.svg"
import homeGrey from "../../../Images/Icons/home-grey.svg"
import cardBlue from "../../../Images/Icons/card-grey.svg"
import cardGrey from "../../../Images/Icons/card-grey.svg"

export default function Sidebar({ activeItem, userType }) {
    const { REACT_APP_API_URL } = process.env;
    const userCategory = userType ? userType == 'student' ? 'Étudiant' : 'Administrateur' : '';
    const userFistname = sessionStorage.getItem("userLastName")
    const userName = sessionStorage.getItem("userFirstName")
    const userImage = sessionStorage.getItem('userImage')

    const [hovered, setHovered] = useState({
        messages: false,
        company: false,
        users: false,
        offers: false,
        settings: false,
        application: false,
    });

    const handleMouseEnter = (key) => {
        setHovered((prevHovered) => ({
            ...prevHovered,
            [key]: true,
        }));
    };

    const handleMouseLeave = (key) => {
        setHovered((prevHovered) => ({
            ...prevHovered,
            [key]: false,
        }));
    };

    const isActive = (key) => hovered[key] || activeItem === key;

    return (
        <div className="w-2/12 bg-light-grey sidebar py-8 border-r">
            <h2 className="px-8 text-2xl text-grey-dark font-semibold">Mon compte</h2>
            {userType == 'administrator' && (
                <>
                    <div className="my-8 px-6 pb-8 border-b">
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('messages') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('messages')}
                            onMouseLeave={() => handleMouseLeave('messages')}
                        >
                            <img
                                src={isActive('messages') ? messageBlue : messageGrey}
                                alt="Messages"
                            />
                            <span>Messages</span>
                        </Link>
                        <Link
                            to={'/backoffice/mon-organisation'}
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('company') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('company')}
                            onMouseLeave={() => handleMouseLeave('company')}
                        >
                            <img
                                src={isActive('company') ? companyBlue : companyGrey}
                                alt="Fiche entreprise"
                            />
                            <span>Fiche entreprise</span>
                        </Link>
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('users') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('users')}
                            onMouseLeave={() => handleMouseLeave('users')}
                        >
                            <img
                                src={isActive('users') ? usersBlue : usersGrey}
                                alt="Candidatures"
                            />
                            <span>Candidatures</span>
                        </Link>
                        <Link
                            to={'/backoffice/entreprise/offres'}
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('offers') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('offers')}
                            onMouseLeave={() => handleMouseLeave('offers')}
                        >
                            <img
                                src={isActive('offers') ? offersBlue : offersGrey}
                                alt="Offres"
                            />
                            <span>Offres</span>
                        </Link>
                    </div>
                    <div className="my-8 px-6 pb-8">
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('settings') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('settings')}
                            onMouseLeave={() => handleMouseLeave('settings')}
                        >
                            <img
                                src={isActive('settings') ? settingsBlue : settingsGrey}
                                alt="settings"
                            />
                            <span>Paramètres</span>
                        </Link>

                        <Link to={'/backoffice/mon-compte'} className={`h-[48px] px-2 mt-4 flex items-center gap-x-4 ${isActive('user') ? 'bg-blue-dark/10 text-blue-dark' : ''}`}
                            onMouseEnter={() => handleMouseEnter('user')}
                            onMouseLeave={() => handleMouseLeave('user')}
                        >
                            <img src={userImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userImage}`} className="rounded-full h-full object-cover"></img>
                            <div className="flex flex-col">
                                <span>{userFistname} {userName}</span>
                                <span>{userCategory}</span>
                            </div>
                        </Link>
                    </div>
                </>
            )}

            {userType == 'student' && (
                <>
                    <div className="my-8 px-6 pb-8 border-b">
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('home') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('home')}
                            onMouseLeave={() => handleMouseLeave('home')}
                        >
                            <img
                                src={isActive('home') ? homeBlue : homeGrey}
                                alt="Accueil"
                                width="24px"
                            />
                            <span>Accueil</span>
                        </Link>
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('application') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('application')}
                            onMouseLeave={() => handleMouseLeave('application')}
                        >
                            <img
                                src={isActive('application') ? cardBlue : cardGrey}
                                alt="Candidatures"
                                width="24px"
                            />
                            <span>Candidatures</span>
                        </Link>
                    </div>
                    <div className="my-8 px-6 pb-8">
                        <Link
                            className={`h-[48px] px-2 flex items-center gap-x-4 ${isActive('settings') ? 'bg-blue-dark/10 text-blue-dark border-y-2' : ''}`}
                            onMouseEnter={() => handleMouseEnter('settings')}
                            onMouseLeave={() => handleMouseLeave('settings')}
                        >
                            <img
                                src={isActive('settings') ? settingsBlue : settingsGrey}
                                alt="settings"
                            />
                            <span>Paramètres</span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}