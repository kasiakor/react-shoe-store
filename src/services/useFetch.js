import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMountedRef = useRef(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // async /await
  useEffect(() => {
    isMountedRef.current = true;
    console.log("is component mounted?", isMountedRef.current);
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          isMountedRef.current && setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        isMountedRef.current && setError(e);
      } finally {
        isMountedRef.current && setLoading(false);
      }
    }
    init();
    return () => {
      isMountedRef.current = false;
    };
  }, [url]);

  return { data, error, loading };
}
