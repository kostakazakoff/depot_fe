import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import api from "../../helpers/Api";
import '../css/Accordion.css';
import Path from "../../paths";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        api.get('articles')
            .then(response => response.data)
            .then(result => {
                setArticles(result.articles);
                setTotalCost(result.totalCost);
            })
            .catch(err => console.log(err));
    }, []);

    const handleArticleChange = () => {
        // setUser(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    return (
        <>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="col-4">

                    </div>
                    <div className="col">
                        <div className="accordion accordion-flush" id="articlesList">
                            {articles && articles.map(data => (
                                <article className="accordion-item border-bottom border-secondary border-1 shadow" key={data.id}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                            <strong className='text-primary'>{data.description}</strong>, инвентарен номер {data.inventory_number}
                                        </button>
                                    </h2>
                                    <div id={`collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#articlesList">

                                        <div className="accordion-body row bg-white">

                                            <div className="col-5 me-1">
                                                <div className="container bg-dark p-auto  d-flex justify-content-center align-items-center" style={{ height: "400px", overflow: 'hidden' }}>
                                                    <img
                                                        src={data.images[0] && data.images[0].url}
                                                        alt={data.images[0] && data.images[0].path}
                                                        className="object-fit-contain"
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="col-2 me-4">
                                                <div
                                                    className="container bg-light border border-dark p-auto d-flex justify-content-center align-items-center overflow-y-auto d-flex flex-column align-items-center"
                                                    style={{ height: "220px" }}
                                                >

                                                </div>
                                            </div> */}

                                            <form className="col me-2">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'1' + data.id}>Каталожен номер: </label>
                                                    </span>
                                                    <input
                                                        id={'1' + data.id}
                                                        name={data.catalog_number}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.catalog_number || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'2' + data.id}>Чертожен номер: </label>
                                                    </span>
                                                    <input
                                                        id={'2' + data.id}
                                                        name={data.draft_number}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.draft_number || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'3' + data.id}>Материал: </label>
                                                    </span>
                                                    <input
                                                        id={'3' + data.id}
                                                        name={data.material}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.material || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'4' + data.id}>Цена (лв.): </label>
                                                    </span>
                                                    <input
                                                        id={'4' + data.id}
                                                        name={data.price}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.price || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'5' + data.id}>Количество (бр.): </label>
                                                    </span>
                                                    <input
                                                        id={'5' + data.id}
                                                        name={data.inventory.quantity}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.inventory.quantity || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'6' + data.id}>Опаковка: </label>
                                                    </span>
                                                    <input
                                                        id={'6' + data.id}
                                                        name={data.inventory.package}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.inventory.package || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">
                                                        <label htmlFor={'7' + data.id}>Позиция: </label>
                                                    </span>
                                                    <input
                                                        id={'7' + data.id}
                                                        name={data.inventory.position}
                                                        type="text"
                                                        className="form-control"
                                                        aria-describedby="basic-addon2"
                                                        value={data.inventory.position || ''}
                                                        onChange={handleArticleChange}
                                                    />
                                                </div>

                                                <div className="btn-group shadow">
                                                    <Link
                                                        type="button"
                                                        className="btn btn-light text-primary"
                                                        id={data.store.id}
                                                        to={Path.STORE} state={{ id: data.store.id }}
                                                    >
                                                        <i className="fa-solid fa-warehouse"></i> {data.store.name}
                                                    </Link>
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
                            <div>Обща стойност на складовите наличности: <strong className='text-primary'>{totalCost}  лв.</strong></div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Articles;