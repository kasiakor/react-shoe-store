import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  // compare new value to old value that was passed in
  const prevUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // run only when urls change
    if (areEqual(prevUrls.current, urls)) return;
    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}

function areEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((element, index, arr2) => element === arr2[index])
  );
}
