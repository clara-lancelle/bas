import React, { useState, useEffect } from 'react';
import useToken from './useToken';
const Connection = () => {
    const [message, setMessage] = useState("")
    const { token, setToken } = useToken()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/auth`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": "student@test.com",
                "password": "pass_student_1234"
            })
        })
            .then(response => response.json())
            .then(response => (
                // get {token : tokenString} or {code: 401, message: 'Identifiants invalides.'}
                console.log(response),
                response.token && (setToken(response.token) && setMessage("")) || setMessage(response.message)
            ))
            .catch(err => console.error(err));
    }, [process.env.REACT_APP_API_URL])

    return (
        <div className='bg-light-grey text-blue-dark'>
            test connection
        </div>
    )
}

export default Connection