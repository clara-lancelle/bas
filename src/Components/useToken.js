import { useState } from 'react'

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        return tokenString || ""
    }
    const [token, setToken] = useState(getToken())
    const saveToken = async (userToken, email) => {
        const {REACT_APP_API_URL} = process.env;

        sessionStorage.setItem('token', userToken)
        setToken(userToken)

        try {
            const response = await fetch(`${REACT_APP_API_URL}/api/security/users/?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userData = data['hydra:member'][0];
                sessionStorage.setItem('userEmail', userData.email)
                sessionStorage.setItem('userFirstName', JSON.stringify(userData.firstname))
                sessionStorage.setItem('userLastName', JSON.stringify(userData.name))
                sessionStorage.setItem('userType', JSON.stringify(userData['@type']))
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const updateUserInfo = async (setIsAuthenticated, setUserInfo) => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
            setUserInfo({
                firstName: JSON.parse(sessionStorage.getItem('userFirstName')),
                lastName: JSON.parse(sessionStorage.getItem('userLastName')),
                userType: JSON.parse(sessionStorage.getItem('userType'))
            });
        } else {
            setIsAuthenticated(false);
            setUserInfo({
                firstName: '',
                lastName: '',
                userType: ''
            });
        }
    };


    return {
        setToken: saveToken,
        token,
        updateUserInfo,
        getToken,
    };
}

export default useToken