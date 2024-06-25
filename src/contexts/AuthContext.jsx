import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const login = () => {
        setIsLoggedIn(true);
        navigate('/posts')
    }
    const logout = () => {
        setIsLoggedIn(false);
        navigate('/login')
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