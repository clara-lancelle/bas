import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../useToken';

const PrivateRoute = ({ notify, openSignInModal }) => {
    const { token } = useToken();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            notify('Veuillez commencer par vous connecter.', 'error');
            openSignInModal()
            navigate('/', { state: { from: location }, replace: true });
        }
    }, [token, navigate, location, notify]);

    return token ? <Outlet /> : null;
};

export default PrivateRoute;