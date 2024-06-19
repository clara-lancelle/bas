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
    return (
        <div className="w-2/12 bg-light-grey h-full py-8 border-r">
            <h2 className="px-8 text-2xl text-grey-dark font-semibold">Mon compte</h2>
            <div className="my-8 pb-8 border-b">
                <Link className="h-[48px] px-8 flex items-center gap-x-4 hover:bg-slate-200">
                    <img src={messageGrey}></img>
                    <span>Messages</span>
                </Link>
                <Link className="h-[48px] px-8 flex items-center gap-x-4 hover:bg-slate-200">
                    <img src={companyGrey}></img>
                    <span>Fiche entreprise</span>
                </Link>
                <Link className="h-[48px] px-8 flex items-center gap-x-4 hover:bg-slate-200">
                    <img src={usersGrey}></img>
                    <span>Candidatures</span>
                </Link>
                <Link className="h-[48px] px-8 flex items-center gap-x-4 hover:bg-slate-200">
                    <img src={offersGrey}></img>
                    <span>Offres</span>
                </Link>
            </div>

            <Link className="h-[48px] px-8 mb-5 flex items-center gap-x-4 hover:bg-slate-200">
                <img src={settingsGrey}></img>
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
    )
}