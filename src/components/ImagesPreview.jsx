import { useState } from "react";
import { useLocation } from "react-router-dom";

const ImagesPreview = () => {
    const location = useLocation();
    const { state } = location;
    const data = { ...state };
    const images = data.images;

    const [imagePreview, setImagePreview] = useState(images[0])

    return (
        <div
            className="container-flow p-5 mt-5 d-flex gap-4 align-items-center justify-content-center"
            style={{ height: '80vh' }}
        >

            <div
                className="overflow-hidden d-flex w-75 h-75 justify-content-center"
            >
                <img
                    src={imagePreview.url}
                    alt="" />
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
                        onClick={() => { setImagePreview(image) }}
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
    )
}

export default ImagesPreview;