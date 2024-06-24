import React, { useState, useEffect } from 'react';
import useToken from './useToken';
const Inscription = () => {
    const [message, setMessage] = useState("")
    const { token, setToken } = useToken()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/students`, {
            method: "POST",
            headers: { 'Content-Type': 'application/ld+json' },
            body: JSON.stringify({
                "birthdate": "2004-06-17",
                "email": "inscriptionn@test.com",
                "password": "pasS_12345+-**",
                "driver_license": true,
                "handicap": true,
                "driverLicense": true,
                "name": "string",
                "firstname": "string",
                "cellphone": '0212121212',
                "city": "string",
                "zipCode": "05799",
                "gender": "Homme",
            })
        })
            .then(response => response.json())
            .then(response => (
                // get {token : tokenString} or {code: 401, message: 'Identifiants invalides.'}
                // console.log(response)
                response.token && (setToken(response.token) && setMessage("")) || (setMessage(response.message) || setMessage(response.detail))
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])
    console.log('token : ' + token)
    console.log('message : ' + message)
    return (
        <div className='bg-light-grey text-blue-dark'>
            test inscription
        </div>
    )
}

export default Inscription