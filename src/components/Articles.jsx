import { useEffect, useState } from "react";
import api from "../helpers/Api";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        api.get('articles')
            .then(response => response.data.articles)
            .then(result => setArticles(result))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container-fluid p-5">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {articles.map(article => (
                    <div className="accordion-item" key={article.article_id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${article.article_id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                {article.description}, инвентарен № <strong>{article.inventory_number}</strong>
                            </button>
                        </h2>
                        <div id={`collapse${article.article_id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {article.inventory_number}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Articles;