import axios from "../utils/axiosClient";
import useStorage from "../hooks/useStorage";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate();
    

    const [user, setUser] = useStorage(null, 'user');

    const isLoggedIn = user !== null;


    const login = async (payload) => {
        try {
            
            const data = await axios.post('/auth/login', payload);
            
            setUser(data.data);
            
            localStorage.setItem('accessToken', response.token);
            
            navigate('/');

        } catch (err) {

            const errors = err.response.data.errors;
            
            const error = new Error(errors ? 'Errore login' : err.response.data);
            
            error.errors = errors;

            throw errors;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    const values = {
        isLoggedIn,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const value = useContext(AuthContext)
    return value
}

export {AuthProvider, useAuth}