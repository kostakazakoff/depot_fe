import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import api from "../helpers/Api";
import Path from "../paths";


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

    const handleArticleChange = (e) => {
        setObj(old => ({ ...old, [e.target.name]: e.target.value }));
        console.log(e.target.value);
    }

    console.log(obj);

    const [inventories, store, totalCost] = Object.values(obj);

    return (
        <>
            <div className="container-xl py-5">
                <div className="accordion accordion-flush" id="storeInventories">

                    {inventories && inventories.map(data => (
                        <article className="accordion-item border-bottom border-secondary border-1" key={data.article_id}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${data.article_id}`}
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                >
                                    <strong className='text-primary'>{data.article.description}</strong>, инвентарен номер {data.article.inventory_number}
                                </button>
                            </h2>
                            <div id={`collapse${data.article_id}`} className="accordion-collapse collapse" data-bs-parent="#storeInventories">

                                <div className="accordion-body row bg-white">

                                    <div className="col-4 ms-4 me-4">
                                        <div
                                            className="container bg-secondary p-auto d-flex justify-content-center align-items-center"
                                            style={{ height: "420px", overflow: 'hidden' }}
                                        >
                                            <img
                                                src={data.images[0] && data.images[0].url}
                                                alt=""
                                                className="object-fit-cover"
                                            />
                                        </div>
                                    </div>

                                    <form className="col me-4">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'1' + data.article_id}>Каталожен номер: </label>
                                            </span>
                                            <input
                                                id={'1' + data.article_id}
                                                name='data.article.catalog_number'
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.article.catalog_number}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'2' + data.article_id}>Чертожен номер: </label>
                                            </span>
                                            <input
                                                id={'2' + data.article_id}
                                                name={data.article.draft_number}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.article.draft_number || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'3' + data.article_id}>Материал: </label>
                                            </span>
                                            <input
                                                id={'3' + data.article_id}
                                                name={data.article.material}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.article.material || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'4' + data.article_id}>Цена (лв.): </label>
                                            </span>
                                            <input
                                                id={'4' + data.article_id}
                                                name={data.article.price}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.article.price || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'5' + data.article_id}>Количество (бр.): </label>
                                            </span>
                                            <input
                                                id={'5' + data.article_id}
                                                name={data.quantity}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.quantity || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'6' + data.article_id}>Опаковка: </label>
                                            </span>
                                            <input
                                                id={'6' + data.article_id}
                                                name={data.package}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.package || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <label htmlFor={'7' + data.article_id}>Позиция: </label>
                                            </span>
                                            <input
                                                id={'7' + data.article_id}
                                                name={data.position}
                                                type="text"
                                                className="form-control"
                                                aria-describedby="basic-addon2"
                                                value={data.position || ''}
                                                onChange={handleArticleChange}
                                            />
                                        </div>

                                        <div className="btn-group shadow">
                                            <button
                                                type="button"
                                                className="btn btn-light text-primary"
                                                id='edit'
                                                name='edit'
                                            >
                                                <i className="fa-solid fa-check"></i>
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
                                    </form>

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