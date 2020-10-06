import React, { useState, useEffect } from "react";

export function useFetch(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setIsLoading(true);
    setOptions(options);
  };

  useEffect(() => {
    if (!isLoading) return;

    async function fetchData() {
      try {
        let token = localStorage.getItem("MEM_AUTH_TOKEN");
        let headers123 = {
          "Content-type": "application/json; charset=UTf-8",
          "Access-Control-Allow-Origin": "*",
          "Authorization": token ? `Token ${token}` : ""
        }
        if (options && options.noContentType) {
          delete headers123["Content-type"];
          delete options.noContentType;
        }
        const response = await fetch(url, {
          ...options,
          mode: "cors",
          headers: headers123,
        });
        const data = await response.json();
        setIsLoading(false);
        setResponse(data);
        setError(null);
      } catch (e) {
        setError({
          error: e.message,
        });
      }
    }

    try {
      fetchData();
    } catch (e) {
      setError({
        error: e.message,
      });
    }
  }, [isLoading, url, options]);

  return { isLoading, response, error, doFetch };
}
