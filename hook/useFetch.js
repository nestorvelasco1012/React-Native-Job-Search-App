import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '2ed6def3a8mshb8f3f5b76b51ca6p1268d5jsn9315b0408801', //insert your rapidAPI key
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        params: { ...query },
      };

      const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request
            (options);
            
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There was an error fetching the data')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };

}

export default useFetch;
