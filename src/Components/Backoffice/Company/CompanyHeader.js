import React from "react";
import plus from "../../../Images/Icons/plus-white.svg";

export default function CompanyHeader({imageName, companyName}) {
    const {REACT_APP_API_URL} = process.env
    return (
        <div className="mb-8 py-4 px-8 flex justify-between items-center border-b">
            {imageName && imageName != '' ? (
                <img src={`${REACT_APP_API_URL}/assets/images/companies/${imageName}`} alt={companyName} className="max-h-16"></img>
            ) : (
                <h1 className="text-2xl font-semibold">{companyName}</h1>
            )}
            <div className="flex items-center h-3/4">
                <button className="btn-blue-dark flex items-center gap-x-2"><img src={plus}></img> <span>Nouvelle offre</span></button>
            </div>
        </div>
    )
}