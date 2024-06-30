import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../../Partials/Ariane';
import Paginate from "../../Paginate/Paginate";
import Sidebar from "../Sidebar/Sidebar";
import plus from "../../../Images/Icons/plus-white.svg";
import CompanyOffersTable from "../../Tables/CompanyOffersTable";
import CompanyHeader from "./CompanyHeader";

export default function CompanyList() {
    const userCompanyId = sessionStorage.getItem('userCompanyId')
    const userToken = sessionStorage.getItem('token')
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState([])
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

    useEffect(() => {
        const getCompanyData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/companies/${userCompanyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.ok) {
                    const companyResponse = await response.json();
                    setCompany(companyResponse);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(true)
        getCompanyData()
        setLoading(false)

    }, [])

    return (
        <div className="h-full flex">
            <Sidebar userType={'administrator'} activeItem="offers"/>
            <div className="w-10/12">
                <CompanyHeader imageName={company.large_image} companyName={company.name}/>
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