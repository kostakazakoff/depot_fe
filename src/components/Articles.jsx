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
                const a = result.articles;
                const t = result.totalCost;
                setArticles(a);
                setTotalCost(t);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="container-xl p-5">
                <div className="accordion accordion-flush" id="articlesList">
                    {articles && articles.map(data => (
                        <article className="accordion-item border-bottom border-dark border-1" key={data.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                    {data.description}, инвентарен № <strong>{data.inventory_number}</strong>
                                </button>
                            </h2>
                            <div id={`collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#articlesList">

                                <div className="accordion-body row bg-white">

                                    <div className="col-5 ms-4 me-4">
                                        <div className="container bg-dark p-auto  d-flex justify-content-center align-items-center" style={{ height: "220px", overflow: 'hidden' }}>
                                            <img
                                                src={data.images[0] && data.images[0].url}
                                                alt={data.images[0] && data.images[0].path}
                                                className="object-fit-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="col me-4">
                                        <div>Каталожен номер: <strong>{data.catalog_number}</strong></div>
                                        <div>Чертожен номер: <strong>{data.draft_number}</strong></div>
                                        <div>Материал: <strong>{data.material}</strong></div>
                                        <div>Цена: <strong>{data.price}</strong> лв.</div>
                                        <div>Количество: <strong>{data.inventory.quantity}</strong> бр.</div>
                                        <div>Опаковка: <strong>{data.inventory.package}</strong></div>
                                        <div>Позиция: <strong>{data.inventory.position}</strong></div>

                                        <div className="btn-group">
                                            <Link
                                                type="button"
                                                className="btn btn-primary active mt-2"
                                                id={data.store.id}
                                                to={Path.STORE} state={{ id: data.store.id }}
                                            >
                                                Склад: {data.store.name}
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-primary mt-2"
                                                id='edit'
                                                name='edit'
                                            >
                                                Редактирай
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-2"
                                                id='delete'
                                                name='delete'
                                            >
                                                Изтрий
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
                <div className="container-fluid d-flex justify-content-center fs-5 fixed-bottom p-3 border-top border-danger bg-white">
                    <div>Обща стоиност на складовите наличности: {totalCost} лв.</div>
                </div>
            </footer>
        </>
    );
}

export default Articles;