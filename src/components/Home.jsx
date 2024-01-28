import { Link } from "react-router-dom";
import { useContext } from 'react';

import AuthContext from "../contexts/authContext";
import Path from '../paths';


const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <img src="https://www.rowse.co.uk/static/images/blog/posts/open-graph/what-is-the-digital-railway-open-graph.jpg"
                alt="" className="img-fluid position-fixed top-0 start-0"></img>
            <div className="container-fluid vertical-center position-absolute top-50 start-50 translate-middle p-5 bg-warning shadow-lg">
                <h1>БДЖ ДЕПО БУРГАС</h1>
                {!isAuthenticated &&
                    <div>
                        <Link
                            type="button"
                            className="btn btn-primary active mt-2"
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
                            className="btn btn-primary active mt-2"
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