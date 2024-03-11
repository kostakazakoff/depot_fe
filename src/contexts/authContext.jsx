/* eslint-disable react/prop-types */
import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import Role from "../roles";


const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = usePersistedState('auth', {});

    const userProps = {
        user_id: credentials.id,
        email: credentials.email,
        name: credentials.first_name,
        last_name: credentials.last_name,
        phone: credentials.phone,
        role: credentials.role,
        // jwt: credentials.jwt,
        isAuthenticated: !!credentials.jwt,
        authorized: [Role.SUPERUSER, Role.ADMIN, Role.STAFF].includes(credentials.role),
        admin: [Role.SUPERUSER, Role.ADMIN].includes(credentials.role),
        setCredentials: setCredentials,
    }

    return (
        <AuthContext.Provider value={userProps}>
            {children}
        </AuthContext.Provider >
    )
}

export default AuthContext;