import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<T>(url);
        // setStoreFunc("currentCity", response.data[0]);
        setData(response.data);
        setLoading(false);
        console.log(url, response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getData();
  }, []);
  return { data, isLoading, isError };
};

export default useFetch;
