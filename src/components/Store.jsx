
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import api from "../helpers/Api";


const Store = () => {
    const location = useLocation();
    const { state } = location;
    const id = state.id;

    const [obj, setObj] = useState([]);

    const articles = obj.inventories;
    const totalCost = obj.total_inventories_cost
    console.log(articles);
    console.log(totalCost);


    useEffect(() => {
        api.get(`stores/${id}/inventories`)
            .then(response => response.data)
            .then(result => setObj(result))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
        {/* {articles.map((article, index) => (
            <div className='mt-5' key={index}>STORE {article.article_id}</div>
        ))} */}
        </>
        
    );
}

export default Store;