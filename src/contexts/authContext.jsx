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
        name: credentials.first_name? credentials.first_name : credentials.email,
        role: credentials.role,
        // jwt: credentials.jwt,
        isAuthenticated: !!credentials.jwt,
        authorized: ['superuser', 'admin', 'staff'].includes(credentials.role),
        admin: ['superuser', 'admin'].includes(credentials.role),
        setCredentials: setCredentials,
    }

    return (
        <AuthContext.Provider value={userProps}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext;