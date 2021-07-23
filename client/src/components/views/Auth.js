import React, { useContext, useState } from 'react'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';
import Spinner from '../../utils/Spinner';



const Auth = ({ authRoute }) => {
    const { authState: {
        authLoading,
        isAuthenticated
    } } = useContext(AuthContext);

    const [alert, setAlert] = useState(null);

    let body;
    if (authLoading) {
        return (
            <Spinner />
        );
    } else if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    } else {

        body = (
            <>
                {authRoute === 'login' && <LoginForm setAlert={setAlert}/>}
                {authRoute === 'register' && <RegisterForm setAlert={setAlert}/>}

            </>
        );
    }




    return (
        <>
        {alert ? <div className="warning">{alert}</div> : null}
        <div className="container">
            <div className="form-container">
                <div id="intro">
                    <h1>Learn!t</h1>
                </div >
                <h3>New day. New things.</h3>
                <div className="auth-form">
                    {body}
                </div>
            </div>
        </div>
        </>
    )

}

export default Auth
