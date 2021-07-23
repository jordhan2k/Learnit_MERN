import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Spinner from '../../utils/Spinner';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { authState: {
        authLoading,
        isAuthenticated
    } } = useContext(AuthContext);

    if (authLoading) {
        <Spinner />
    }

    return (
        <Route {...rest} render={props => isAuthenticated ? (
            <>
                <Component {...rest} {...props} />
            </>) : (
            <Redirect to='/login' />
        )} />
    );
}

export default ProtectedRoute
