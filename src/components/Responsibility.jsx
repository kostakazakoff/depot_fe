/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const Responsibility = (props) => {
    const store = props.store;
    const responsibilities = props.responsibilities;
    const setResponsibilities = props.setResponsibilities;
    const targetUser = props.targetUser;
    const currentResponsibilities = targetUser.responsibilities;
    const optionRef = useRef(null);
    const IconRef = useRef(null);


    const handleResponsibilitiesSelection = (e) => {
        if (responsibilities.includes(parseInt(e.target.value))) {
            setResponsibilities(state => state.filter(v => v != parseInt(e.target.value)));
        } else {
            setResponsibilities(state => Array.from(new Set([
                ...state,
                parseInt(e.target.value),
            ])));
        }
    }


    useEffect(() => {
        let stores = [];
        currentResponsibilities?.forEach(store => stores.push(store.id));
        
        setResponsibilities(stores);
    }, [targetUser]);


    useEffect(() => {
        if (responsibilities.includes(store.id)) {
            optionRef.current.className = 'dropdown-item btn text-primary mb-2';
            IconRef.current.className = "fa-solid fa-circle-check pe-2";
        } else {
            optionRef.current.className = 'dropdown-item btn mb-2';
            IconRef.current.className = "fa-regular fa-circle-xmark pe-2";
        }

        console.log(optionRef.current.className);
        console.log(responsibilities);
    }, [responsibilities, targetUser]);


    return (
        <button
            type="button"
            // className = 'dropdown-item btn'
            value={store.id}
            ref={optionRef}
            onClick={handleResponsibilitiesSelection}
            // onClick={(e) => setResponsibilities(state => Array.from(new Set([
            //     ...state,
            //     parseInt(e.target.value),
            // ])))}
        >
            <i ref={IconRef} ></i>
            Склад {store.name}
        </button>
    )
}


export default Responsibility;