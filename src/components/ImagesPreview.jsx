import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const ImagesPreview = () => {
    const location = useLocation();
    const { state } = location;
    const data = { ...state };
    const images = data.images;

    const imagePreviewRef = useRef(images[0]);

    const [img, setImg] = useState(images[0]);
    
    const setImagePreview = (image) => {
        imagePreviewRef.current = image;
        setImg(imagePreviewRef.current);
    }
    // const [imagePreview, setImagePreview] = useState(images[0])

    return (
        <section
            className="container-fluid d-flex flex-column align-items-center justify-content-center bg-light"
        >
            <div
                className="p-5 mt-5 d-flex gap-4 align-items-center justify-content-center"
                style={{ width: '100%', height: '80vh' }}
            >

                <div
                    className="overflow-hidden d-flex justify-content-center rounded align-items-center"
                    style={{ width: '100%', height: '100%' }}
                >
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={100}
                        initialPositionY={200}
                        centerOnInit={true}
                        limitToBounds={true}
                        minScale={0.5}
                        centerZoomedOut={true}
                        className="object-fit-cover mw-100 mh-100"
                    >
                        <TransformComponent>
                    <img
                        ref={imagePreviewRef}
                        src={imagePreviewRef.current.url}
                        alt=""
                        className="object-fit-contain h-100 mh-100"
                    />
                    </TransformComponent>
                    </TransformWrapper>

                </div>

                <div
                    className="overflow-y-auto overflow-x-hidden h-75"
                >
                    {images.map(image => (
                        <div
                            className="m-4 shadow rounded"
                            style={{ width: "100px", height: "100px", overflow: 'hidden' }}
                            key={image.id}
                            type="button"
                            onClick={() => setImagePreview(image)}
                        >
                            <img
                                className="object-fit-cover w-100 h-100"
                                src={image.url}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Link
                to={data.path}
                className="btn btn-secondary align-self-end me-5"
            >
                Назад
            </Link>
        </section>

    )
}

export default ImagesPreview;