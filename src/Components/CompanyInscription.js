import React, { useState, useEffect } from 'react';
import useToken from './useToken';

const CompanyInscription = () => {
    const [message, setMessage] = useState("")
    const {token, setToken} = useToken()
    const [categoryIRI, setCategoryIRI] = useState("");
    const [activitiesIRI, setActivitiesIRI] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/company_categories`, {})
            .then(response => response.json())
            .then(data => {
                if (data['hydra:member'].length > 0) {
                    setCategoryIRI(data['hydra:member'][0]['@id']);
                }
            })
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/company_activities`, {})
            .then(response => response.json())
            .then(data => {
                if (data['hydra:member'].length > 0) {
                    data['hydra:member'].map((item, index) => (
                        [0,1,2].includes(index) && setActivitiesIRI((activitiesIRI) => ([...activitiesIRI, data['hydra:member'][index]['@id']]))
                    ))
                }
            })
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL]);
   
    useEffect(() => {
        if (!categoryIRI || !activitiesIRI) return;
        fetch(`${process.env.REACT_APP_API_URL}/api/companies/peristingUserAndCompany`, {
            method: "POST",
            headers: { 'Content-Type': 'application/ld+json' },
            body: JSON.stringify({
                "companyName": "stringt",
                "siret": "39242018800048",
                "workforce": "5",
                "address": "stringb",
                "city": "stringv",
                "zip_code": "49896",
                "phone_num": "0616161616",
                "description": "stringr",
                "additional_address": "stringf.jpg",
                "picto_image": "stringj.jpg",
                "workforce_range": "1-9",
                'category': categoryIRI,
                'activities' : activitiesIRI,

                "firstname": 'tutu',
                'name': 'tata',
                'email': 'tata@tooutuo.com',
                'cellphone': '0646464646',
                'gender': 'Homme',
                'position': 'assis',
                'password' : 'pass_1245*D'
            })
        })
    
            .then(response => response.json())
            .then(response => (console.log(response)))
            .catch(err => console.error(err));
        
    }, [process.env.REACT_APP_API_URL, categoryIRI, activitiesIRI])
    return (
        <div className='bg-light-grey text-blue-dark'>
            test company inscription
        </div>
    )
}

export default CompanyInscription