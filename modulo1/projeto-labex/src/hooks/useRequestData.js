import axios from "axios";
import { useState, useEffect } from "react";

export const useRequestData = (url) => {
  const [data, setData] = useState([undefined]);

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getData, []);
  return [data];
};
