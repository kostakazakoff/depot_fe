import GetDataFromBackEnd from "./GetDataFromBackEnd";

const Articles = () => {
    const articles = GetDataFromBackEnd('articles');
    console.log(`Articles: ${articles}`);

    return (
        <>
            <div className="container-xxl">
                <div className="accordion" id="articles">
                    {/* {
                    articles.map(a => (
                        <ArticleDetails
                            key={a.article_id}
                            {...a}

                            
                            
                        />
                    ))
                    } */}
                </div>
            </div>
        </>
    );
}

export default Articles;