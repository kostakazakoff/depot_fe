import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useDropzone } from 'react-dropzone'

import StoresStateContext from '../contexts/storesContext';
import api from "../helpers/Api";
import Path from "../paths";
import AuthStateContext from "../contexts/authContext";
import APIPath from "../apiPaths";


const AddArticle = (prps) => {
    const navigate = useNavigate();
    const { stores } = StoresStateContext();
    const [article, setArticle] = useState({ 'store_id': stores[0]?.id });
    const { authorized } = AuthStateContext();
    const [files, setFiles] = useState([]);
    const getArticles = prps.getArticles;
    
    useEffect(() => {
        !authorized && navigate(Path.HOME);
    }, [authorized])

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
            'inventory_number': article.inventory_number || '',
            'catalog_number': article.catalog_number || '',
            'draft_number': article.draft_number || '',
            'material': article.material || '',
            'description': article.description || '',
            'price': parseFloat(article.price) || '',
            'store_id': article.store_id || '',
            'quantity': article.quantity || '',
            'package': article.package || '',
            'position': article.position || '',
        }

        Object.entries(body).forEach(
            ([key, value]) => {
                formData.append(key, value);
            }
        );

        api.post(APIPath.CREATE_ARTICLE, formData)
            .then((response) => handleResponse(response.data))
            .catch(err =>
                Swal.fire(
                    "Грешка!",
                    err.response.data.message,
                    "error"
                ));
    }

    const handleResponse = (response) => {
        if (response.message !== 'success') {
            const errors = response.data;
            let message = [];
            Object.values(errors).forEach(e => message.push(e));
            message = message.join(' ').toString();
            Swal.fire(
                "Грешка!",
                message,
                "error"
            );
        } else {
            Swal.fire(
                "Готово!",
                "Артикулът беше създаден.",
                "success"
            );
            getArticles();
            setFiles([]);
            setArticle({ 'store_id': stores[0]?.id });
        }
    }

    return (
        <form
            className="modal-dialog modal-dialog-centered modal-xl"
            onSubmit={handleSubmit}
        >
            <div
                className="modal-content px-3 py-2"
                style={{ backgroundColor: '#bebebe' }}
            >
                <div
                    className="modal-body vertical-center rounded-2 position-relative"
                >
                    <div className="row">

                        <div className="col">
                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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
                        </div>

                        <div className="col">
                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3">
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

                            <div className="input-group mb-3 dropdown">
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

                        </div>
                    </div>

                    <section
                        {...getRootProps({
                            className: 'w-100 border border-1 border-light rounded p-4 position-relative',
                        })}
                        style={{cursor: 'pointer'}}
                    >
                        <h2 className='text-primary fs-3'>Качи нови файлове</h2>
                        <input
                            {...getInputProps()}
                        />
                        {
                            isDragActive ?
                                <p className='text-secondary'>Пусни файла тук...</p> :
                                <p className='text-secondary'>Провлачи и пусни файловете тук (локални файлове или от мрежата)...</p>
                        }
                    </section>

                    <section className="w-100 rounded position-relative py-2 mt-2 overflow-y-auto">
                        <div
                            className="container d-flex flex-row justify-content-start align-items-bottom gap-3 position-relative overflow-x-auto"
                        >
                            <div className='d-flex justify-content-start align-items-center gap-4 position-relative'>
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
                            </div>
                        </div>
                    </section>

                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                        onClick={() => setFiles([])}
                    >
                        Отказ
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                    >
                        Запиши
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddArticle;