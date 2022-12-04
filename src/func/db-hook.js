import { useState, useEffect } from "react";
import axios from "axios";

export const useDB = (type, token) => {
    const [result, setResult] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/${type}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                // .then((res) => res)
                .then((res) => {
                    setResult(res.data.items);
                })
                .catch((err) => {
                    setError(err);
                });
        };

        getAllItems();
    }, [type]);

    

    return { result, error };
}