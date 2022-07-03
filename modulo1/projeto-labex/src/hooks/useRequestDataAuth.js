import { useEffect, useState } from "react";
import axios from "axios";

const useRequestDataAuth = (initialData, url) => {
  const [data, setData] = useState(initialData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [url]);

  return data;
};

export default useRequestDataAuth;
