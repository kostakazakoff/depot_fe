import { createContext, useState } from "react";

const PreviousLocationContext = createContext();

export const PreviousLocationProvider = ({ children }) => {
    const [previousLocation, setPreviousLocation] = useState(null);

    const locationProps = {
        previousLocation: previousLocation,
        setPreviousLocation: setPreviousLocation
    }

    return (
        <PreviousLocationContext.Provider value={locationProps}>
            {children}
        </PreviousLocationContext.Provider>
    )
}

export default PreviousLocationContext;