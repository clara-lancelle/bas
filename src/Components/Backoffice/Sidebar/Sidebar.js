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

export default function Sidebar() {
    const [hovered, setHovered] = useState({
        messages: false,
        company: false,
        users: false,
        offers: false,
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
    return (
        <div className="w-2/12 bg-light-grey h-full py-8 border-r">
            <h2 className="px-8 text-2xl text-grey-dark font-semibold">Mon compte</h2>
            <div className="my-8 px-6 pb-8 border-b">
                <Link
                    className="h-[48px] px-2 flex items-center gap-x-4 hover:bg-blue-dark/10 hover:text-blue-dark hover:border-y-2"
                    onMouseEnter={() => handleMouseEnter('messages')}
                    onMouseLeave={() => handleMouseLeave('messages')}
                >
                    <img
                        src={hovered.messages ? messageBlue : messageGrey}
                        alt="Messages"
                    />
                    <span>Messages</span>
                </Link>
                <Link
                    className="h-[48px] px-2 flex items-center gap-x-4 hover:bg-blue-dark/10 hover:text-blue-dark hover:border-y-2"
                    onMouseEnter={() => handleMouseEnter('company')}
                    onMouseLeave={() => handleMouseLeave('company')}
                >
                    <img
                        src={hovered.company ? companyBlue : companyGrey}
                        alt="Fiche entreprise"
                    />
                    <span>Fiche entreprise</span>
                </Link>
                <Link
                    className="h-[48px] px-2 flex items-center gap-x-4 hover:bg-blue-dark/10 hover:text-blue-dark hover:border-y-2"
                    onMouseEnter={() => handleMouseEnter('users')}
                    onMouseLeave={() => handleMouseLeave('users')}
                >
                    <img
                        src={hovered.users ? usersBlue : usersGrey}
                        alt="Candidatures"
                    />
                    <span>Candidatures</span>
                </Link>
                <Link
                    className="h-[48px] px-2 flex items-center gap-x-4 hover:bg-blue-dark/10 hover:text-blue-dark hover:border-y-2"
                    onMouseEnter={() => handleMouseEnter('offers')}
                    onMouseLeave={() => handleMouseLeave('offers')}
                >
                    <img
                        src={hovered.offers ? offersBlue : offersGrey}
                        alt="Offres"
                    />
                    <span>Offres</span>
                </Link>
            </div>
            <div className="my-8 px-6 pb-8">
            <Link
                className="h-[48px] px-2 mb-4 flex items-center gap-x-4 hover:bg-blue-dark/10 hover:text-blue-dark hover:border-y-2"
                onMouseEnter={() => handleMouseEnter('settings')}
                onMouseLeave={() => handleMouseLeave('settings')}
            >
                <img
                    src={hovered.settings ? settingsBlue : settingsGrey}
                    alt="settings"
                />
                <span>Paramètres</span>
            </Link>

            <Link className="h-[48px] px-8 mb-5 flex items-center gap-x-4">
                <img src=""></img>
                <div className="flex flex-col">
                    <span>Prénom NOM</span>
                    <span>Administrateur</span>
                </div>
            </Link>
            </div>
        </div>
    )
}