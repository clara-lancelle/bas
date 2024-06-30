import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import CompanyHeader from "../../CompanyHeader";
import FormStep from './FormStep';

export default function OfferCreate() {
    const { REACT_APP_API_URL } = process.env
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId')
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(false)

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
                <CompanyHeader imageName={company.large_image} companyName={company.name} showOfferCreate={false} />
                <div class="mx-8">
                    <h2 className="text-3xl	text-grey-dark font-semibold mb-8">Publier une offre</h2>
                    <FormStep/>
                </div>
            </div>
        </div>
    )
}