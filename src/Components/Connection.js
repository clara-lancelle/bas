import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import { jwtDecode } from "jwt-decode";

const Connection = () => {
    // const [message, setMessage] = useState("")
    // const {token, setToken} = useToken()
   
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/auth`, {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             "email": "admin@test.com",
    //             "password": "pass_1234"
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             // get {token : tokenString} or {code: 401, message: 'Identifiants invalides.'}
    //             if(response.token) {
    //                 setToken(response.token)
    //                 setMessage("")
    //                 const username = jwtDecode(response.token).username
    //                 fetch(`${process.env.REACT_APP_API_URL}/api/security/users?email=${username}`, {
    //                 method: "GET",
    //                 headers: { 
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             })
    //                 .then(response => response.json())
    //                 .then(response => (
    //                     console.log(response['hydra:member'][0])
    //                 ))
    //             } else {
    //                 setMessage(response.message) 
    //             }
    //         })
    //         .catch(err => console.error(err));
        
    // }, [process.env.REACT_APP_API_URL, token])
    return (
        <div className='bg-light-grey text-blue-dark'>
            test connection
        </div>
    )
}

export default Connection