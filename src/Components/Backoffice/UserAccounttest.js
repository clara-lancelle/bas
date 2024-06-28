import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import pen from "../../Images/Icons/pencil.svg";

export default function UserAccount({ userInfo, notify }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { REACT_APP_API_URL } = process.env;
    const userToken = sessionStorage.getItem('token');
    const userEmail = sessionStorage.getItem('userEmail');

    const [formData, setFormData] = useState({
        gender: '',
        firstname: '',
        name: '',
        birthdate: '',
        cellphone: '',
        email: '',
        emailConfirm: '',
        address: '',
        additionalAddress: '',
        zipCode: '',
        city: '',
        websiteUrl: '',
        linkedinUrl: '',
        graduation: '',
        graduationNext: '',
        schoolName: '',
        formationName: '',
        motivations: '',
        profileImage: [],
        cv: [],
        hasDrivingLicense: false,
        isHandicap: false,
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getUserData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/security/students/?email=${encodeURIComponent(userEmail)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userResponse = data['hydra:member'][0];
                setUserData(userResponse);

                setFormData({
                    ...formData,
                    // gender: userData.gender || '',
                    firstname: userResponse.firstname || '',
                    name: userResponse.name || '',
                    birthdate: formatDate(userResponse.birthdate) || '',
                    cellphone: userResponse.cellphone || '',
                    email: userResponse.email || '',
                    emailConfirm: userResponse.email || '',
                    address: userResponse.address || '',
                    additionalAddress: userResponse.additionalAddress || '',
                    zipCode: userResponse.zipCode || '',
                    city: userResponse.city || '',
                    profileImage: userResponse.profileImage ? [userResponse.profileImage] : [],
                })
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [userEmail])

    if (!userData) {
        return <div>No user data available</div>;
    }

    return (
        <>
            <div className="h-full flex">
                <Sidebar userType={'student'} activeItem="home" />
                <div className="w-10/12">
                    {loading && (
                        <p>Chargement...</p>
                    )}
                    {!loading && (
                        <>
                            <div className="mb-8 py-4 px-8 flex justify-between border-b w-full text-xl">
                                <p>Bienvenue <span className="font-semibold">{userData.firstName} {userData.name}</span></p>
                            </div>

                            <div className="px-8 py-4">
                                <div className="w-2/3">
                                    <div className="border rounded-md">
                                        <div className="p-4 border-b w-full flex justify-between items-center">
                                            <h2 className="font-semibold text-xl">Votre identité</h2>
                                            <button className="btn-blue-dark flex items-center gap-x-2"><img src={pen}></img> <span>Modifier</span></button>
                                        </div>
                                        <div className="flex justify-between items-start gap-x-6 px-4 py-6">
                                            <div className="w-2/12">
                                            <img src={userData.profileImage == 'null' ? `${REACT_APP_API_URL}/assets/images/users/usr.png` : `${REACT_APP_API_URL}/assets/images/users/${userData.profileImage}`} className="rounded-full h-full w-16 object-cover"></img>
                                            </div>
                                            <div className=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}