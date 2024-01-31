/* eslint-disable react/prop-types */
import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";


const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = usePersistedState('stores', {});

    const storesProps = {
        stores: stores,
        setStores: setStores
    }

    return (
        <StoresContext.Provider value={storesProps}>
            {children}
        </StoresContext.Provider>
    )
}

export default StoresContext;