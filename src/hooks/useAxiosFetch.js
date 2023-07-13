import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (url) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });
                if (mounted) {
                    setData(response.data);
                }
            } catch (error) {
                if (mounted) {
                    setFetchError(fetchError);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
            setIsLoading(false);
        };

        fetchData(url);

        return () => {
            // Cleanup function
            mounted = false;
            source.cancel();
        };
    }, [url, fetchError]);

    return { data, fetchError, isLoading };
};

export default useAxiosFetch;
