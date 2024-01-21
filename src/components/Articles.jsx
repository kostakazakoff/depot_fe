import { useEffect, useState } from "react";
import api from "../helpers/Api";
import './css/Accordion.css';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        api.get('articles')
            .then(response => response.data.articles)
            .then(result => setArticles(result))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container-xl p-5">
            <div className="accordion accordion-flush" id="accordionFlushExample">

                {articles.map(article => (
                    <article className="accordion-item border-bottom border-dark" key={article.article_id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${article.article_id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                {article.description}, инвентарен № <strong>{article.inventory_number}</strong>
                            </button>
                        </h2>
                        <div id={`collapse${article.article_id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

                            <div className="accordion-body row">

                                <div className="col-5">
                                    <div className="container bg-dark p-auto  d-flex justify-content-center align-items-center" style={{height: "220px", overflow: 'hidden'}}>
                                        <img
                                        src="https://easy-travel.io/41525_5/%D0%A0%D0%B5%D0%BC%D0%BE%D0%BD%D1%82-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%82%D0%B0%D0%B9%D0%BB-87hc-%D0%B7%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BC%D1%8F%D0%BD%D0%B0-storage_image.jpg"
                                        alt=""
                                        className="object-fit-cover"
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div>Каталожен номер: <strong>{article.catalog_number}</strong></div>
                                    <div>Чертожен номер: <strong>{article.draft_number}</strong></div>
                                    <div>Материал: <strong>{article.material}</strong></div>
                                    <div>Цена: <strong>{article.price}</strong> лв.</div>
                                    <div>Количество: <strong>{article.quantity}</strong> бр.</div>
                                    <div>Опаковка: <strong>{article.package}</strong></div>
                                    <div>Позиция: <strong>{article.position}</strong></div>
                                    <button type="button" className="btn btn-primary mt-2">Склад: <strong>{article.store_id}</strong></button>
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