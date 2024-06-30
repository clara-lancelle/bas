import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ariane from '../../Partials/Ariane';
import Paginate from "../../Paginate/Paginate";
import Sidebar from "../Sidebar/Sidebar";
import plus from "../../../Images/Icons/plus-white.svg";
import CompanyOffersTable from "../../Tables/CompanyOffersTable";
import CompanyHeader from "./CompanyHeader";

export default function CompanyList() {
    const { REACT_APP_API_URL } = process.env
    const userCompanyId = sessionStorage.getItem('userCompanyId')
    const userToken = sessionStorage.getItem('token')
    const [company, setCompany] = useState([])
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const companyResponse = await fetch(`${REACT_APP_API_URL}/api/companies/${userCompanyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                if (companyResponse.ok) {
                    const companyData = await companyResponse.json();
                    setCompany(companyData);
                } else {
                    console.error('Failed to fetch company data');
                }

                const offersResponse = await fetch(`${REACT_APP_API_URL}/api/offers?company=${userCompanyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                if (offersResponse.ok) {
                    const offersData = await offersResponse.json();
                    setOffers(offersData['hydra:member']);
                } else {
                    console.error('Failed to fetch offers');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [REACT_APP_API_URL, userCompanyId, userToken]);

    return (
        <div className="h-full flex">
            <Sidebar userType={'administrator'} activeItem="offers" />
            <div className="w-10/12">
                <CompanyHeader imageName={company.large_image} companyName={company.name} />
                <div class="mx-8 border">
                    <div className="ps-6 py-6 pe-10 flex justify-between">
                        <span className="font-semibold text-xl">{offers.length > 0 ? offers.length : '0'} offres trouvées</span>
                        <span>Filtrer par statut :
                            <select>
                                <option value={"all"}>Tous</option>
                                <option value={"active"}>Actifs</option>
                                <option value={"closed"}>Cloturés</option>
                            </select>
                        </span>
                    </div>
                    {offers.length > 0 ? (
                        <CompanyOffersTable data={offers} />
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <p>Vous n'avez posté aucune offre pour le moment.</p>
                            <p>Commencez maintenant !</p>
                            <div className="flex items-center h-3/4">
                                <button className="btn-blue-dark flex items-center gap-x-2"><img src={plus}></img> <span>Nouvelle offre</span></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}