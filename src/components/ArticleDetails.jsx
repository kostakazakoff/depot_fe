const ArticleDetails = (article) => {
    <div className="accordion-item" key={article.article_id}>
        <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {article.description}
            </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>{article.inventory_number}</strong> Alabala
            </div>
        </div>
    </div>
}

export default ArticleDetails;