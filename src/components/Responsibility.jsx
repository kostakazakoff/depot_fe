/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const Responsibility = (props) => {
    const store = props.store;
    const responsibilities = props.responsibilities;
    const setResponsibilities = props.setResponsibilities;
    const targetUser = props.targetUser;
    const currentResponsibilities = targetUser.responsibilities;
    const optionRef = useRef(null);


    useEffect(() => {
        let stores = [];
        currentResponsibilities?.forEach(store => stores.push(store.id.toString()));
        
        setResponsibilities(stores);
    }, [targetUser]);


    useEffect(() => {
        if (responsibilities.includes(store.id.toString())) {
            optionRef.current.className = 'bg-secondary';
        } else {
            optionRef.current.className = 'bg-light';
        }
    }, [responsibilities, targetUser]);

    
    return (
        <option
            type="button"
            value={store.id}
            ref={optionRef}
        >
            Склад {store.name}
        </option>
    )
}

export default Responsibility;