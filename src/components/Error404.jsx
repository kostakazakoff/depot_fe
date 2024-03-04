const Error404 = () => {
    return (
        <>
            <div className="position-fixed overflow-hidden h-100 w-100">
                <img src="https://www.rowse.co.uk/static/images/blog/posts/open-graph/what-is-the-digital-railway-open-graph.jpg"
                    alt="" className="object-fit-cover"></img>
            </div>
            <div
                className="position-absolute rounded-2 shadow-lg top-50 start-50 translate-middle w-25 h-25 bg-warning vertical-center align-text-middle d-flex flex-column justify-content-center align-items-center text-center"
            >
                <div>
                    <h3>Нещо се обърка!</h3>
                    <p>Опитайте по-късно...</p>
                </div>
            </div>


        </>
    )
}

export default Error404;