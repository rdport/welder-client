import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getIsAuthenticated, auth } from '../utils/auth';
import { setAuthLoading, setIsAuthenticatedRedux, setAuthError } from '../store/actions/authAction';

function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated());
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (!isAuthenticated && !window.localStorage.getItem('logout')) {
      dispatch(setAuthLoading(true));
      auth()
      .then(data => {
        setIsAuthenticated(data);
        dispatch(setIsAuthenticatedRedux(true));
        dispatch(setAuthError(null));
      })
      .catch(err => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch(setAuthError(error));
        if (path !== '/login') history.push('/login');
      })
      .finally (_ => dispatch(setAuthLoading(false)));
    }
  },[]);
  return isAuthenticated;
}

export default useAuthentication;