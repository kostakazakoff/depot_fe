import { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const ImagesPreview = (props) => {
    const data = { ...props };
    const images = data.images;

    const imagePreviewRef = useRef(images[0]);

    const setImagePreview = (image) => {
        console.log(image);
        imagePreviewRef.current.src = image.url;
        imagePreviewRef.current.alt = image.url;
    }

    return (
        <div
            className="modal-content"
            style={{ height: '90vh' }}
        >
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <section
                className="modal-body overflow-hidden d-flex flex-row justify-content-between gap-4"
            >
                <div
                    className="d-flex justify-content-center align-items-center h-100 bg-light overflow-hidden"
                    style={{width: '90%'}}
                >
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={100}
                        initialPositionY={200}
                        centerOnInit={true}
                        limitToBounds={true}
                        minScale={0.5}
                        centerZoomedOut={true}
                    >
                        <TransformComponent>
                            <img
                                ref={imagePreviewRef}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div
                    className="d-flex flex-column overflow-y-auto overflow-x-hidden gap-2 p-4"
                >
                    {images.map(image => (
                        <div
                            className="shadow rounded"
                            style={{ width: "100px", height: "100px", minHeight: '100px', overflow: 'hidden' }}
                            key={image.id}
                            type="button"
                            onClick={() => setImagePreview(image)}
                        >
                            <img
                                className="object-fit-cover w-100 h-100"
                                src={image.url}
                                alt={image.url}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* <div
                className="modal-footer"
                style={{width: '100%'}}
            >
                
            </div> */}

        </div>
    )
}

export default ImagesPreview;