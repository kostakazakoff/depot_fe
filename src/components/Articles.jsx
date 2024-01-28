import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import api from "../helpers/Api";
import './css/Accordion.css';
import Path from "../paths";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('articles')
            .then(response => response.data.articles)
            .then(result => setArticles(result))
            .catch(err => console.log(err));
    }, []);

    function goToStore(e) {
        e.preventDefault();
        navigate(Path.STORE, { state: { id: e.currentTarget.id } });
    }

    return (
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
                                        <button
                                            type="button"
                                            className="btn btn-primary active mt-2"
                                            id={data.store.id}
                                            onClick={goToStore}
                                        >
                                            Склад: {data.store.name}
                                        </button>
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
    );
}

export default Articles;