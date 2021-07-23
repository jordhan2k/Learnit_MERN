import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from '../reducer/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
import setAuthToken from '../utils/setAuthToken';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    // authentication state reducer
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });

    // call loadUser every time a change occurs


    // authenticate user 
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/auth/`);
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            // remove acces Token from header
            setAuthToken(null);
            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            });
            console.log(error);
        }
    }

    useEffect(() => loadUser(), [])

    const loginUser = async (userForm) => {
        try {
            // send a login request to the server
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser();

            return response.data;
        } catch (error) {
            return  (error.response.data) ? error.response.data: { success: false, message: error.message };
        }
    }

    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser();

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }


    const logoutUser = () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        }

        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }

        });
        setAuthToken(null);

    }




    const authContextData = { loginUser, registerUser, logoutUser, authState };



    return (

        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;