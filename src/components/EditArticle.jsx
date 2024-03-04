import { useState, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useDropzone } from 'react-dropzone'

import StoresContext from '../contexts/storesContext';
import api from "../helpers/Api";
import Path from "../paths";


const EditArticle = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [article, setArticle] = useState(state);
    const { stores } = useContext(StoresContext);
    const [files, setFiles] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(state => [
                ...state,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        // maxSize: 1200 * 980,
        onDrop
    })

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeExistedImage = id => {
        const newImages = article.images.filter(image => image.id !== id);
        article.images = newImages;
        setArticle(state => ({
            ...state,
            [state.images]: article.images
        }));
        setImagesToDelete(state => ([
            ...state, id
        ]))
    };

    const handleChange = (e) => {
        setArticle(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData()

        if (files.length) {
            files.forEach(file => {
                formData.append('images[]', file)
            })
        }

        const body = {
            'inventory_number': article.inventory_number,
            'catalog_number': article.catalog_number,
            'draft_number': article.draft_number,
            'material': article.material,
            'description': article.description,
            'price': parseFloat(article.price),
            'store_id': article.store_id,
            'quantity': article.quantity,
            'package': article.package,
            'position': article.position,
        }

        imagesToDelete.length > 0
            && api.post('/images/delete', imagesToDelete)
                .then(setArticle(state => ({
                    ...state, ...body
                })))
                .catch(err => console.log(err));

        Object.entries(body).forEach(
            ([key, value]) => {
                formData.append(key, value);
            }
        )

        api.post(`/articles/edit/${article.id}`, formData)
            .then(setArticle(state => ({
                ...state, ...body
            })))
            .catch(err => console.log(err))
            .then(Swal.fire(
                "Готово!",
                "Артикулът беше редактиран.",
                "success"
            ))
            .then(navigate(Path.ARTICLES));
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
                        .then(Swal.fire(
                            "Готово!",
                            `Артикул "${e.target.name}" беше изтрит.`,
                            "success"
                        ))
                        .then(navigate(Path.ARTICLES))
                }
            })
    }

    return (
        <form
            className="container-sm vertical-center mt-5 p-5 bg-white rounded-4 shadow-lg position-relative"
            style={{ maxWidth: '800px' }}
            onSubmit={handleSubmit}
        >
            <h4
            className="py-1 px-4 text-primary position-absolute bg-light border border-1 border-dark rounded shadow"
            style={{ top: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
                {article.description}
            </h4>

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4">
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

            <div className="input-group mb-4 dropdown">
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

            <section className="w-100 shadow mt-4 rounded p-4 position-relative">
                <h2 className='text-primary fs-3'>Текущи файлове</h2>
                <div
                    className="container d-flex justify-content-start align-items-center gap-4 position-relative overflow-x-auto"
                    style={{ height: "120px" }}>

                    {article.images.map(image => (
                        <div
                            className="overflow-hidden border border-danger rounded bg-light shadow position-relative d-flex justify-content-center"
                            style={{ width: '100px', height: '100px', minWidth: '100px' }}
                            key={image.id}
                        >
                            <img
                                src={image.url}
                                alt={image.url}
                                className="object-fit-cover w-100 h-100"
                            />
                            <button
                                type='button'
                                className='position-absolute bg-danger text-white'
                                style={{ right: '3px', top: '3px', borderRadius: '100%', border: 'none' }}
                                onClick={() => removeExistedImage(image.id)}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section
                {...getRootProps({
                    className: 'w-100 shadow mt-4 rounded p-4 position-relative',
                })}
            >
                <h2 className='text-primary fs-3'>Качи нови файлове</h2>
                <input
                    className='text-secondary'
                    {...getInputProps()}
                />
                {
                    isDragActive ?
                        <p>Пусни файла тук ...</p> :
                        <p>Провлачи и пусни файловете тук ...</p>
                }
            </section>

            <section className='overflow-y-auto d-flex justify-content-start align-items-center gap-4 position-relative mt-4'>
                {files.map(file => (
                    <div
                        key={file.name}
                        className='rounded bg-light shadow position-relative overflow-hidden d-flex justify-content-center'
                        style={{ width: '100px', height: '100px', minWidth: '100px' }}
                    >
                        <img
                            src={file.preview}
                            alt={file.name}
                            className='className="object-fit-cover h-100'
                            onLoad={() => {
                                URL.revokeObjectURL(file.preview)
                            }}
                        />
                        <button
                            type='button'
                            className='position-absolute bg-danger text-white'
                            style={{ right: '3px', top: '3px', borderRadius: '100%', border: 'none' }}
                            onClick={() => removeFile(file.name)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                ))}
            </section>

            <div className="btn-group border border-dark shadow mt-4">
                <button
                    type="submit"
                    className="btn btn-light"
                >
                    <i className="fa-solid fa-check pe-2 text-primary"></i>
                    Потвърди
                </button>

                <button
                    type="button"
                    className="btn btn-light"
                    name={article.description}
                    value={article.id}
                    onClick={handleDeleteArticle}
                >
                    <i className="fa-solid fa-trash pe-2 text-danger"></i>
                    Изтрий
                </button>

                <Link
                    to={Path.ARTICLES}
                    type="button"
                    className="btn btn-light"
                >
                    <i className="fa-solid fa-ban pe-2"></i>
                    Назад
                </Link>
            </div>
        </form>
    )
}

export default EditArticle;