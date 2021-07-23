import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegisterForm = ({ setAlert }) => {
    // user context
    const { registerUser } = useContext(AuthContext);

    // local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });


    const { username, password, confirmPassword } = registerForm;

    // handle input changes
    const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

    const register = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert('Passwords do not match');
            setTimeout(() => setAlert(null), 5000);
        }

        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert(registerData.message);
                setTimeout(() => setAlert(null), 5000);
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form className="auth-form"
                onSubmit={register}
            >

                <input
                    className="auth-input"
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeRegisterForm}
                    required />
                <input
                    className="auth-input"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangeRegisterForm}
                    required />
                <input
                    className="auth-input"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                    required />
                <input
                    className="auth-input auth-button"
                    type="submit"
                    value="Register" />





            </form>

            <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
        </>
    )
}

export default RegisterForm;
