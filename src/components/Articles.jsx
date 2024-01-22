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
        navigate(Path.STORE, { state: { id: e.currentTarget.name} });
    }

    return (
        <div className="container-xl p-5">
            <div className="accordion accordion-flush" id="accordionFlushExample">

                {articles.map(data => (
                    <article className="accordion-item border-bottom border-dark border-1" key={data.article_id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.article_id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                {data.description}, инвентарен № <strong>{data.inventory_number}</strong>
                            </button>
                        </h2>
                        <div id={`collapse${data.article_id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

                            <div className="accordion-body row bg-white">

                                <div className="col-5 ms-4 me-4">
                                    <div className="container bg-dark p-auto  d-flex justify-content-center align-items-center" style={{ height: "220px", overflow: 'hidden' }}>
                                        <img
                                            src="https://easy-travel.io/41525_5/%D0%A0%D0%B5%D0%BC%D0%BE%D0%BD%D1%82-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%82%D0%B0%D0%B9%D0%BB-87hc-%D0%B7%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BC%D1%8F%D0%BD%D0%B0-storage_image.jpg"
                                            alt=""
                                            className="object-fit-cover"
                                        />
                                    </div>
                                </div>

                                <div className="col me-4">
                                    <div>Каталожен номер: <strong>{data.catalog_number}</strong></div>
                                    <div>Чертожен номер: <strong>{data.draft_number}</strong></div>
                                    <div>Материал: <strong>{data.material}</strong></div>
                                    <div>Цена: <strong>{data.price}</strong> лв.</div>
                                    <div>Количество: <strong>{data.quantity}</strong> бр.</div>
                                    <div>Опаковка: <strong>{data.package}</strong></div>
                                    <div>Позиция: <strong>{data.position}</strong></div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-2"
                                        id={data.article_id}
                                        name={data.store_id}
                                        onClick={goToStore}
                                    >
                                        Склад: <strong>{data.name}</strong>
                                    </button>
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