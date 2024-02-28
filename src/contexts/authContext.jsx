/* eslint-disable react/prop-types */
import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";


const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = usePersistedState('auth', {});

    const userProps = {
        user_id: credentials.id,
        email: credentials.email,
        role: credentials.role,
        // jwt: credentials.jwt,
        authorized: ['superuser', 'admin', 'staff'].includes(credentials.role),
        isAuthenticated: !!credentials.jwt,
        setCredentials: setCredentials,
    }

    return (
        <AuthContext.Provider value={userProps}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext;