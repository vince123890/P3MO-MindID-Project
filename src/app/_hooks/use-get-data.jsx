import { useEffect, useState } from "react";

export const useGetData = (data, delay = 300) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  if (loading) {
    return { data: null, status: "loading", loading: true };
  }

  return {
    data,
    status: "success",
    loading: false,
  };
};
