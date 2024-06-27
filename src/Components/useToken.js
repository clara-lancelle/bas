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
                console.log(userData)
                userData.email ? sessionStorage.setItem('userEmail', userData.email) : sessionStorage.setItem('userEmail', null)
                userData.firstname ? sessionStorage.setItem('userFirstName', userData.firstname) : sessionStorage.setItem('userFirstName', null)
                userData.name ? sessionStorage.setItem('userLastName', userData.name) : sessionStorage.setItem('userLastName', null)
                userData.profileImage ? sessionStorage.setItem('userImage', userData.profileImage): sessionStorage.setItem('userImage', null)
                sessionStorage.setItem('userType', userData['@type'])
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
                firstName: sessionStorage.getItem('userFirstName'),
                lastName: sessionStorage.getItem('userLastName'),
                userType: sessionStorage.getItem('userType'),
                userImage: sessionStorage.getItem('userImage')
                
            });
        } else {
            setIsAuthenticated(false);
            setUserInfo({
                firstName: '',
                lastName: '',
                userType: '',
                userImage: ''
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