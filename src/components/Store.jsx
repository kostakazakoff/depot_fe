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
        <>
            <div className="container-xl py-5">
                <div className="accordion accordion-flush" id="storeInventories">

                    {inventories && inventories.map(data => (
                        <article className="accordion-item border-bottom border-secondary border-1" key={data.id}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${data.id}`}
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                >
                                    <strong className='text-primary'>{data.article.description}</strong>, инвентарен номер {data.article.inventory_number}
                                </button>
                            </h2>
                            <div id={`collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#storeInventories">

                                <div className="accordion-body row bg-white">

                                    <div className="col-4 ms-4 me-4">
                                        <div
                                            className="container bg-secondary p-auto d-flex justify-content-center align-items-center"
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
                                        <div>Каталожен номер: <strong>{data.article.catalog_number}</strong></div>
                                        <div>Чертожен номер: <strong>{data.article.draft_number}</strong></div>
                                        <div>Материал: <strong>{data.article.material}</strong></div>
                                        <div>Цена: <strong>{data.article.price}</strong> лв.</div>
                                        <div>Количество: <strong>{data.quantity}</strong> бр.</div>
                                        <div>Опаковка: <strong>{data.package}</strong></div>
                                        <div>Позиция: <strong>{data.position}</strong></div>

                                        <div className="btn-group shadow mt-2">
                                        <button
                                                type="button"
                                                className="btn btn-light text-primary"
                                                id='edit'
                                                name='edit'
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light text-danger"
                                                id='delete'
                                                name='delete'
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <footer>
                <div className="container-fluid d-flex justify-content-center fs-5 fixed-bottom p-3 border-top border-dark bg-light">
                    <div className='me-5'>Склад <strong className='text-primary'>{store?.name}</strong></div>
                    <div>Стойност на складовите наличности: <strong className='text-primary'>{totalCost} лв.</strong></div>
                </div>
            </footer>
        </>

    );
}

export default Store;