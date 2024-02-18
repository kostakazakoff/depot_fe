import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContext } from 'react';
import StoresContext from '../contexts/storesContext';
import api from "../helpers/Api";
import Path from "../paths";

const EditArticle = () => {
    const location = useLocation();
    const { state } = location;
    const [article, setArticle] = useState(state);
    const { stores } = useContext(StoresContext);

    const handleChange = (e) => {
        setArticle(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // api.post(`/articles/edit/${article.id}`, {

        // })
    }

    return (
        <form
            className="container-sm vertical-center mt-4 p-5 bg-white rounded-4 shadow-lg"
            style={{ maxWidth: '800px' }}
            onSubmit={handleSubmit}
        >
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

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="description">Описание:</label>
                <input
                    id='description'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='description'
                    value={article.description || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="price">Цена (лв.):</label>
                <input
                    id='price'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='price'
                    value={article.price || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="quantity">Количество (бр.):</label>
                <input
                    id='quantity'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='quantity'
                    value={article.quantity || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="package">Опаковка:</label>
                <input
                    id='package'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='package'
                    value={article.package || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow">
                <label className="input-group-text" id="basic-addon2" htmlFor="position">Позиция:</label>
                <input
                    id='position'
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    name='position'
                    value={article.position || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group mb-2 shadow dropdown">
                <span className="input-group-text">Склад:</span>
                <select
                    id="storeSelect"
                    className="form-select"
                    value={article.store_id}
                    name="store_id"
                    onChange={handleChange}
                >
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-3">
                <div className="container p-auto d-flex justify-content-center align-items-center" style={{ height: "200px", overflow: 'hidden' }}>
                    {article.images.map(image => (
                        <div
                            className="form-check"
                            style={{ "position": "relative" }}
                            key={image.id}>
                            <img
                                src={image.url}
                                alt={image.url}
                                className="w-25 mh-100"
                            />
                            <input
                                className="form-check-input bg-danger"
                                type="checkbox"
                                value={image.id}
                                id="flexCheckIndeterminate"
                                style={{ "position": "absolute", "top": "0", "left": "0" }}
                            />
                        </div>
                    ))}
                    {/* <img
                        src={article.images[0] && article.images[0].url}
                        alt={article.images[0] && article.images[0].path}
                        className="object-fit-contain"
                    /> */}
                </div>
            </div>

            <div className="btn-group shadow mt-4">
                <button
                    type="submit"
                    className="btn btn-light"
                >
                    <i className="fa-solid fa-check pe-2 text-primary"></i>
                    Submit
                </button>

                <button
                    type="button"
                    className="btn btn-light"
                >
                    <i className="fa-solid fa-trash pe-2 text-danger"></i>
                    Delete
                </button>

                <Link
                    to={Path.ARTICLES}
                    type="button"
                    className="btn btn-light"
                >
                    <i className="fa-solid fa-ban pe-2"></i>
                    Cancel
                </Link>
            </div>
        </form>
    )
}

export default EditArticle;