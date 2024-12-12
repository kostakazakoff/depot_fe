/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";


const StoresContext = createContext({
    stores: {},
    setStores: () => {}
});
const StoresStateContext = () => useContext(StoresContext);

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = usePersistedState('stores', []);

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

export default StoresStateContext;