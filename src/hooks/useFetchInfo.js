import { useState, useEffect } from "react";
import { getToken } from '../utils/auth';
import axios from '../config/axiosinstance';
import errorHandler from '../utils/errorHandler';

export default function useFetchInfo(menuName, id, dataByPk, setDataByPk) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dataByPk?.id === id) {
      setData(dataByPk);
    } else {
      setLoading(true);
      setError(null);
      axios
        .post(`/${menuName}/${id}`, {}, {
          headers: { access_token: getToken() }
        })
        .then(res => {
          setData(res.data);
          setDataByPk(res.data);
        })
        .catch(err => {
          console.log(err)
          errorHandler(null, setError, err);
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }, [menuName]);

  return { data, loading, error };
}