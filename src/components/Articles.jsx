import { useEffect, useState, useContext, useRef } from "react";
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import api from "../helpers/Api";
import './css/Accordion.css';
import Path from "../paths";
import StoresContext from "../contexts/storesContext";
import convertDate from "./ConvertDate";

const Articles = () => {
    const { stores } = useContext(StoresContext);
    const [articles, setArticles] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [filterOptions, setFilterOptions] = useState({});
    const resetBtn = useRef(null);
    const iconRef = useRef(null);

    useEffect

    useEffect(() => {
        console.log('Articles component mounted');
        getArticles();
    }, []);

    const getArticles = (e) => {
        e?.preventDefault();
        api.get('articles', { params: filterOptions })
            .then(response => response.data)
            .then(result => {
                setArticles(result.articles);
                setTotalCost(result.totalCost);
            })
            .catch(err => console.log(err));
    }

    const handleFilterChange = (e) => {
        setFilterOptions(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const handleDeleteArticle = (e) => {
        Swal.fire({
            title: "Сигурен ли сте?",
            text: "Няма да можете да възстановите този артикул!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Да, изтрий!",
        })
            .then(result => {
                if (result.isConfirmed) {
                    api.post(`articles/delete/${e.target.value}`)
                        .then(getArticles())
                        .then(Swal.fire(
                            "Готово!",
                            `Артикул "${e.target.name}" беше изтрит.`,
                            "success"
                        ))
                }
            })
    }

    useEffect(() => {
        if (Object.keys(filterOptions).length === 0) {
            iconRef.current.className = ('fa-solid fa-rotate-right pe-2 text-primary');
        } else {
            iconRef.current.className = ('fa-solid fa-power-off pe-2 text-danger');
        }
    }, [filterOptions])

    return (
        <>
            <div className="container-fluid p-5 mb-5 mt-3" style={{ minHeight: '90vh' }}>
                <div className="d-flex flex-column flex-xxl-row justify-content-end position-relative">

                    <section
                        className="me-5 mb-5 mt-3 fixed-top bg-light overflow-y-auto pb-5 ps-3 pe-3"
                        style={{ width: '30%', minWidth: '400px', height: '90%', top: '9%', left: '60px' }}
                    >
                        <form
                            className="container-sm vertical-center p-4 bg-white border border border-2 border-gray rounded-4 shadow position-relative"
                            style={{ maxWidth: '800px' }}
                            onSubmit={getArticles}
                        >

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="description">Описание:</label>
                                <input
                                    id='description'
                                    type="text"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    name='description'
                                    value={filterOptions.description}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="inventory_number">Инвентарен номер:</label>
                                <input
                                    id="inventory_number"
                                    type="text"
                                    className="form-control"
                                    aria-label="Inventory number"
                                    aria-describedby="basic-addon2"
                                    name="inventory_number"
                                    value={filterOptions.inventory_number}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="catalog_number">Каталожен номер:</label>
                                <input
                                    id="catalog_number"
                                    type="text"
                                    className="form-control"
                                    aria-label="Catalog number"
                                    aria-describedby="basic-addon2"
                                    name='catalog_number'
                                    value={filterOptions.catalog_number}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="draft_number">Чертежен номер:</label>
                                <input
                                    id="draft_number"
                                    type="text"
                                    className="form-control"
                                    aria-label="Drafft number"
                                    aria-describedby="basic-addon2"
                                    name='draft_number'
                                    value={filterOptions.draft_number}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="material">Материал:</label>
                                <input
                                    id='material'
                                    type="text"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    name='material'
                                    value={filterOptions.material}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="position">Позиция:</label>
                                <input
                                    id='position'
                                    type="text"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    name='position'
                                    value={filterOptions.position}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="from_date">От дата:</label>
                                <input
                                    id='from_date'
                                    type="date"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    name='from_date'
                                    value={filterOptions.from_date}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow">
                                <label className="input-group-text" id="basic-addon2" htmlFor="to_date">До дата:</label>
                                <input
                                    id='to_date'
                                    type="date"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    name='to_date'
                                    value={filterOptions.to_date}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="input-group mb-3 shadow dropdown">
                                <span className="input-group-text">Склад:</span>
                                <select
                                    id="storeSelect"
                                    className="form-select"
                                    name="store"
                                    value={filterOptions.store}
                                    onChange={handleFilterChange}
                                >
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="btn-group border border-dark shadow mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-light"
                                    onClick={() =>
                                        Object.keys(filterOptions).length === 0 &&
                                        setFilterOptions({ store: '1' })
                                    }
                                >
                                    <i className="fa-solid fa-check pe-2 text-primary"></i>
                                    Филтриране
                                </button>
                                <button
                                    type="reset"
                                    className="btn"
                                    onClick={() => { setFilterOptions({}); getArticles() }}
                                    ref={resetBtn}
                                >
                                    <i ref={iconRef} className="fa-solid fa-power-off"></i>
                                </button>
                            </div>
                        </form>
                    </section>

                    <section style={{ width: '66%', alignSelf: 'end' }}>
                        <div className="accordion accordion-flush ps-3 pe-3" id="articlesList">
                            {articles && articles.map(data => (
                                <article className="accordion-item border-bottom border-secondary border-1 shadow" key={data.id}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                            <strong className='text-primary pe-1'>{data.description}</strong> | въведен на {convertDate(data.created_at)} | последна промяна на {convertDate(data.updated_at)}
                                        </button>
                                    </h2>
                                    <div id={`collapse${data.id}`} className="accordion-collapse collapse" data-bs-parent="#articlesList">

                                        <div className="accordion-body row bg-white">
                                            {data.images.length
                                                ?
                                                <Link
                                                    to={Path.IMAGES_PREVIEW}
                                                    state={{ images: data.images, path: window.location.pathname }}
                                                    className="me-1 w-50"
                                                    style={{ height: "300px", overflow: 'hidden', position: 'relative', minWidth: '400px' }}
                                                    type="button"
                                                    id={data.id}
                                                >
                                                    <img
                                                        src={data.images[0] && data.images[0].url}
                                                        alt={data.images[0] && data.images[0].path}
                                                        className="object-fit-cover w-100 mh-100"
                                                    />
                                                </Link>
                                                :
                                                <div className="w-50 d-flex justify-content-center align-items-center">
                                                    <i className="fa-regular fa-images fa-10x text-primary"></i>
                                                </div>
                                            }

                                            <div className="col me-2 lh-lg" style={{ minWidth: '400px' }}>
                                                <div>Каталожен номер: <strong>{data.catalog_number}</strong></div>
                                                <div>Чертожен номер: <strong>{data.draft_number}</strong></div>
                                                <div>Материал: <strong>{data.material}</strong></div>
                                                <div>Цена: <strong>{data.price}</strong> лв.</div>
                                                <div>Количество: <strong>{data.inventory.quantity}</strong> бр.</div>
                                                <div>Опаковка: <strong>{data.inventory.package}</strong></div>
                                                <div>Позиция: <strong>{data.inventory.position}</strong></div>

                                                <div className="btn-group shadow mt-4 border border-dark">
                                                    <Link
                                                        type="button"
                                                        className="btn btn-light"
                                                        to={Path.STORE}
                                                        state={{ id: data.stores[0].id }}
                                                    >
                                                        <i className="fa-solid fa-warehouse pe-2 text-primary"></i> {data.stores[0].name}
                                                    </Link>

                                                    <Link
                                                        type="button"
                                                        className="btn btn-light"
                                                        to={Path.EDIT_ARTICLE}
                                                        state={{
                                                            id: data.id,
                                                            inventory_number: data.inventory_number,
                                                            catalog_number: data.catalog_number,
                                                            draft_number: data.draft_number,
                                                            material: data.material,
                                                            description: data.description,
                                                            price: data.price,
                                                            images: data.images,
                                                            inventory_id: data.inventory.id,
                                                            quantity: data.inventory.quantity,
                                                            package: data.inventory.package,
                                                            position: data.inventory.position,
                                                            store_id: data.stores[0].id,
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square pe-2 text-primary"></i>
                                                        Редактирай
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="btn btn-light"
                                                        id='delete'
                                                        name={data.description}
                                                        value={data.id}
                                                        onClick={handleDeleteArticle}
                                                    >
                                                        <i className="fa-solid fa-trash pe-2 text-danger"></i>
                                                        Изтрий
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                    <footer>
                        <div className="container-fluid d-flex justify-content-center fs-5 fixed-bottom p-2 border-top border-dark bg-dark text-light">
                            <div>Обща стойност на наличностите: <strong className='text-primary'>{totalCost}  лв.</strong></div>
                        </div>
                    </footer>
                </div>
            </div >
        </>
    );
}

export default Articles;