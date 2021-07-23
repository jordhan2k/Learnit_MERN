import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const LoginForm = ({ setAlert }) => {
    // context
    const { loginUser } = useContext(AuthContext);

    //local satte
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });


    // destructuring data
    const { username, password } = loginForm;



    // event hangler for login ìnormation
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    // login handler
    const login = async event => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData);
            if (!loginData.success) {
                // alert(loginData.message);
                setAlert(loginData.message);
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form
                className="auth-form"
                onSubmit={login}>
                <input
                    className="auth-input"
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeLoginForm}
                    required />
                <input
                    className="auth-input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={onChangeLoginForm}
                    name="password"
                    required />
                <input className="auth-input auth-button" type="submit" value="Login" />
            </form>
            <p>Don't have an account? <Link to="/register" className="link">Register</Link></p>
        </>
    )
}

export default LoginForm;
