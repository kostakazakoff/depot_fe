import api from "../helpers/Api";
import { useState, useEffect } from "react";

const GetDataFromBackEnd = (input) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(input)
            .then(response => response.data)
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    data && console.log('GetDataFromBackEnd'.data);

    return data;
}

export default GetDataFromBackEnd;