import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useDropzone } from 'react-dropzone'

import StoresContext from '../contexts/storesContext';
import api from "../helpers/Api";
import Path from "../paths";
import AuthContext from "../contexts/authContext";


const AddArticle = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState({ 'store_id': '1' });
    const { stores } = useContext(StoresContext);
    const { authorized } = useContext(AuthContext);
    const [files, setFiles] = useState([]);

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

        Object.entries(body).forEach(
            ([key, value]) => {
                formData.append(key, value);
            }
        )

        api.post(`/articles/store`, formData)
            .catch(err => console.log(err))
            .then(Swal.fire(
                "Готово!",
                "Артикулът беше създаден.",
                "success"
            ))
            .then(navigate(Path.ARTICLES));
    }

    return (
        <form
            className="container-sm vertical-center mt-5 p-5 bg-white border border border-2 border-gray rounded-4 shadow-lg position-relative"
            style={{ maxWidth: '800px' }}
            onSubmit={handleSubmit}
        >

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow">
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

            <div className="input-group mb-4 shadow dropdown">
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

            <section
                {...getRootProps()}
                className='w-100 shadow rounded p-4 position-relative border border-dark-subtle'
            >
                <h2 className='text-primary fs-3'>Качи файлове</h2>
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

export default AddArticle;