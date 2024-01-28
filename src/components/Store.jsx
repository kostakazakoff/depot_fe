import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import api from "../helpers/Api";


const Store = () => {
    const location = useLocation();
    const { state } = location;
    const id = state.id;

    const [obj, setObj] = useState([]);

    useEffect(() => {
        api.get(`stores/${id}/inventories`)
            .then(response => response.data)
            .then(result => setObj(result))
            .catch(err => console.log(err));
    }, [id]);

    const [inventories, store, totalCost] = Object.values(obj);

    return (
        <div className="container-xl p-5">
            <div className="accordion accordion-flush" id="storeInventories">
                <h2 className='mb-5'>Склад {store && store.id} / <strong>{store && store.name}</strong></h2>

                {inventories && inventories.map(data => (
                    <article className="accordion-item border-bottom border-dark border-1" key={data.id}>
                        <h2 className="accordion-header">
                            <button
                            className="accordion-button collapsed"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target={`#collapse${data.id}`}
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                            >
                                <strong>{data.article[0].description}</strong>, инвентарен № {data.article[0].inventory_number}
                            </button>
                        </h2>
                        <div id={`collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#storeInventories">

                            <div className="accordion-body row bg-white">

                                <div className="col-5 ms-4 me-4">
                                    <div
                                    className="container bg-dark p-auto d-flex justify-content-center align-items-center"
                                    style={{ height: "220px", overflow: 'hidden' }}
                                    >
                                        <img
                                            src={data.images[0] && data.images[0].url}
                                            alt=""
                                            className="object-fit-cover"
                                        />
                                    </div>
                                </div>

                                <div className="col me-4">
                                    <div>Каталожен номер: <strong>{data.article[0].catalog_number}</strong></div>
                                    <div>Чертожен номер: <strong>{data.article[0].draft_number}</strong></div>
                                    <div>Материал: <strong>{data.article[0].material}</strong></div>
                                    <div>Цена: <strong>{data.article[0].price}</strong> лв.</div>
                                    <div>Количество: <strong>{data.quantity}</strong> бр.</div>
                                    <div>Опаковка: <strong>{data.package}</strong></div>
                                    <div>Позиция: <strong>{data.position}</strong></div>

                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-2"
                                            id='edit'
                                            name='edit'
                                        // onClick={goToStore}
                                        >
                                            Редактирай
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger mt-2"
                                            id='delete'
                                            name='delete'
                                        // onClick={goToStore}
                                        >
                                            Изтрий
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </article>
                ))}
                <div className='mt-5'>Стойност на складовите наличности: <strong>{totalCost} лв.</strong></div>
            </div>
        </div>
    );
}

export default Store;