import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../Partials/Ariane';
import Paginate from "../Paginate/Paginate";
import Sidebar from "./Sidebar/Sidebar";
import plus from "../../Images/Icons/plus-white.svg";
import CompanyOffersTable from "../Tables/CompanyOffersTable";

export default function CompanyList() {
    const data = [
        {
            name: 'Social Media Assistant',
            status: 'Cloturé',
            publicationDate: '20/04/2024',
            deadline: '20/05/2024',
            type: 'Alternance',
            applications: 19
        }
    ];
    return (
        <div className="h-full flex">
            <Sidebar activeItem="offers"/>
            <div className="w-10/12">
                <div className="mb-8 py-4 px-8 flex justify-between border-b">
                    <img></img>
                    <div className="flex items-center h-3/4">
                        <button className="btn-blue-dark flex items-center gap-x-2"><img src={plus}></img> <span>Nouvelle offre</span></button>
                    </div>
                </div>
                <div class="mx-8 border">
                    <div className="ps-6 py-6 pe-10 flex justify-between">
                        <span className="font-semibold text-xl">X offres trouvées</span>
                        <span>Filtrer par statut :
                            <select>
                                <option value={"all"}>Tous</option>
                                <option value={"active"}>Actifs</option>
                                <option value={"closed"}>Cloturés</option>
                            </select>
                        </span>
                    </div>
                    <CompanyOffersTable data={data} />
                </div>
            </div>
        </div>
    )
}