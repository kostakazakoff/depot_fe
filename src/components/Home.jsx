import { Link } from "react-router-dom";

import AuthStateContext from "../contexts/authContext";
import Path from '../paths';


const Home = () => {
    const { isAuthenticated, email } = AuthStateContext();

    return (
        <>
            {/* <div className="position-fixed overflow-hidden h-100 w-100">
                <img src="https://www.rowse.co.uk/static/images/blog/posts/open-graph/what-is-the-digital-railway-open-graph.jpg"
                    alt="" className="object-fit-cover"></img>
            </div> */}

            <div className="mw-50 d-flex flex-column justify-content-between align-items-center position-absolute top-50 start-50 translate-middle px-5 py-5 rounded-3">
                <h4 className="mb-4 text-black">{email ? email : ''}</h4>
                {!isAuthenticated &&
                    <div>
                        <Link
                            type="button"
                            className="btn btn-primary btn-lg"
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
                            className="btn btn-dark btn-lg"
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