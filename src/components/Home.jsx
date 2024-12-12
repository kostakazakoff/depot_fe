import { Link } from "react-router-dom";

import AuthStateContext from "../contexts/authContext";
import Path from '../paths';


const Home = () => {
    const { isAuthenticated } = AuthStateContext();

    return (
        <>
            <div className="position-fixed overflow-hidden h-100 w-100">
                <img src="https://www.rowse.co.uk/static/images/blog/posts/open-graph/what-is-the-digital-railway-open-graph.jpg"
                    alt="" className="object-fit-cover"></img>
            </div>

            <div className="container-fluid d-flex justify-content-between align-items-center position-absolute top-50 start-50 translate-middle px-5 py-3 bg-warning shadow-lg">
                <h1>LINKER</h1>
                {!isAuthenticated &&
                    <div>
                        <Link
                            type="button"
                            className="btn btn-dark btn-lg mt-2"
                            to={Path.LOGIN}
                        >
                            Вписване
                        </Link>
                    </div>
                }
                {isAuthenticated &&
                    <div>
                        <Link
                            type="button"
                            className="btn btn-dark btn-lg mt-2"
                            to={Path.LOGOUT}
                        >
                            Отписване
                        </Link>
                    </div>
                }
            </div>
        </>
    );
}

export default Home;