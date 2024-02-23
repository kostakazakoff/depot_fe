import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import api from "../helpers/Api";
import './css/Accordion.css';
import Path from "../paths";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const getArticles = () => {
        api.get('articles')
            .then(response => response.data)
            .then(result => {
                setArticles(result.articles);
                setTotalCost(result.totalCost);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log('Articles component mounted')
        getArticles()
    }, []);

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

    return (
        <>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="col-5">

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
                                            {data.images.length
                                                ?
                                                <Link
                                                    to={Path.IMAGES_PREVIEW}
                                                    state={{ images: data.images, path: window.location.pathname }}
                                                    className="me-1 w-50"
                                                    style={{ height: "300px", overflow: 'hidden', position: 'relative' }}
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

                                            <div className="col me-2 lh-lg">
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
                    </div>
                    <footer>
                        <div className="container-fluid d-flex justify-content-center fs-5 fixed-bottom p-3 border-top border-dark bg-light">
                            <div>Обща стойност на складовите наличности: <strong className='text-primary'>{totalCost}  лв.</strong></div>
                        </div>
                    </footer>
                </div>
            </div >
        </>
    );
}

export default Articles;