import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import api from "../helpers/Api";
import './css/Accordion.css';
import Path from "../paths";

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

                                            <div className="col-4 me-1">
                                                <div className="container bg-dark p-auto  d-flex justify-content-center align-items-center" style={{ height: "220px", overflow: 'hidden' }}>
                                                    <img
                                                        src={data.images[0] && data.images[0].url}
                                                        alt={data.images[0] && data.images[0].path}
                                                        className="object-fit-contain"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-2 me-4">
                                                <div
                                                    className="container bg-light border border-dark p-auto d-flex justify-content-center align-items-center overflow-y-auto d-flex flex-column align-items-center"
                                                    style={{ height: "220px" }}
                                                >

                                                </div>
                                            </div>

                                            <div className="col me-2">
                                                <div>Каталожен номер: <strong>{data.catalog_number}</strong></div>
                                                <div>Чертожен номер: <strong>{data.draft_number}</strong></div>
                                                <div>Материал: <strong>{data.material}</strong></div>
                                                <div>Цена: <strong>{data.price}</strong> лв.</div>
                                                <div>Количество: <strong>{data.inventory.quantity}</strong> бр.</div>
                                                <div>Опаковка: <strong>{data.inventory.package}</strong></div>
                                                <div>Позиция: <strong>{data.inventory.position}</strong></div>

                                                <div className="btn-group shadow mt-2">
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
                            <div>Обща стойност на складовите наличности: <strong className='text-primary'>{totalCost}  лв.</strong></div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Articles;