import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
    const history = useHistory();

    const logout = () => {
        if(localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
            history.replace('dashboard');
        }
    }

    useEffect(() => {
        logout();
    }, []);

    return (
        <>
        </>
    )
}

export default Logout;