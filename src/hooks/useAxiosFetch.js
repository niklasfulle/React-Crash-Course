import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });
                if (mounted) {
                    setData(response.data);
                }
            } catch (error) {
                if (mounted) {
                    setError(error);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
            setLoading(false);
        };

        fetchData(url);

        return () => {
            // Cleanup function
            mounted = false;
            source.cancel();
        };
    }, [url]);

    return { data, error, loading };
};

export default useAxiosFetch;
