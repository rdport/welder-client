import { useState, useEffect } from "react";
import { getToken } from '../utils/auth';
import axios from '../config/axiosinstance';
import errorHandler from '../utils/errorHandler';

export default function useFetchOptions(
    menuName, options, endPoint, dependency, dependencyValue, association
  ) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!options && dependency && dependencyValue || !options && !dependency) {
      const params = {};
      if (dependency) {
        params.dependencyidname = dependency;
        params.dependencyid = dependencyValue;
        params.associationidname = association;
      }
      setLoading(true);
      setError(null);
      axios
        .post(endPoint, {}, {
          headers: { access_token: getToken() },
          params
        })
        .then(res => {
          console.log(res, 'masukkkkkk')
          setData(res.data);
          console.log(res.data, '<<<<<<<<< useFetchOptions');
        })
        .catch(err => {
          console.log(err)
          errorHandler(null, setError, err);
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }, [menuName, dependencyValue]);

  return { data, loading, error };
}