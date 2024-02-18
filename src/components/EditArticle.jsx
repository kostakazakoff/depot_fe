import { useState } from "react";
import { useLocation } from "react-router-dom";

const EditArticle = () => {
    const location = useLocation();
    const { state } = location;
    const [article, setArticle] = useState(state);
    console.log(article.catalog_number);

    const handleChange = (e) => {
        setArticle(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <form className="container-lg vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-white rounded-4 shadow-lg">
            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="inventory_number">Инвентарен номер:</label>
                <input
                    id="inventory_number"
                    type="text"
                    className="form-control"
                    aria-label="Inventory number"
                    aria-describedby="basic-addon2"
                    name="inventory_number"
                    value={article.inventory_number || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="catalog_number">Каталожен номер:</label>
                <input
                    id="catalog_number"
                    type="text"
                    className="form-control"
                    aria-label="Catalog number"
                    aria-describedby="basic-addon2"
                    name='catalog_number'
                    value={article.catalog_number || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="draft_number">Чертежен номер:</label>
                <input
                    id="draft_number"
                    type="text"
                    className="form-control"
                    aria-label="Drafft number"
                    aria-describedby="basic-addon2"
                    name='draft_number'
                    value={article.draft_number || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="material">Материал:</label>
                <input
                    id='material'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='material'
                    value={article.material || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-3">
                <div className="container p-auto d-flex justify-content-center align-items-center shadow" style={{ height: "400px", overflow: 'hidden' }}>
                    <img
                        src={article.images[0] && article.images[0].url}
                        alt={article.images[0] && article.images[0].path}
                        className="object-fit-contain"
                    />
                </div>
            </div>
        </form>
    )
}

export default EditArticle;