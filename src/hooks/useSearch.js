import { useState, useEffect } from 'react';
import axios from '../config/axiosinstance';
import { useSelector, useDispatch } from 'react-redux';
import usePrevious from '../hooks/usePrevious';
import { getToken } from '../utils/auth';
import { getDragInit, resetDragInit } from '../utils/rearrange';
import errorHandler from '../utils/errorHandler';
import { setIsPressed, setPage, setNoSearchBar, setKey, resetSearchBar } from '../store/actions/searchAction';
import { setIsDatabaseChanged, setIsRearrangeMode } from '../store/actions/formAction';

function useSearch(menuName) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const { isAuthenticatedRedux } = useSelector(state => state.authReducer);
  const { term, key, year, month, day, order, page, limit, isPressed } = useSelector(state => state.searchReducer);
  const { isDatabaseChanged, isRearrangeMode } = useSelector(state => state.formReducer);
  const { path, component } = useSelector(state => state.pathReducer);
  const previousComponent = usePrevious(component);
  const previousPath = usePrevious(path);
  const previousPage = usePrevious(page);
  const previousTerm = usePrevious(term);
  const previousOrder = usePrevious(order);
  const previousIsPressed = usePrevious(isPressed);
  const previousIsDatabaseChanged = usePrevious(isDatabaseChanged);
  const previousIsAuthenticatedRedux = usePrevious(isAuthenticatedRedux);
  const isDateEmpty = (year === '' && month === '' && day === '');
  let params = {};

  function search() {
    if (previousPath !== path) {
      dispatch(setIsRearrangeMode(false));
      dispatch(setNoSearchBar(false));
      resetDragInit();
    }
    // dispatch(setIsNavPathChanged(false));
    setLoading(true);
    setError(null);
    if (!isRearrangeMode || previousPath !== path) {
      if (previousPath !== path) {
        params.page = 1;
        params.limit = 20;
        console.log('1111111111');
      } else {
        console.log('222222')
        params.page = page;
        params.limit = limit;
        if (term.trim().length) params.term = term;
        if (
          key.trim().length
          && (
            term.trim().length
            || year.trim().length
            || month.trim().length
            || day.trim().length
          )
        ) params.key = key;
        if (year.trim().length) params.year = year;
        if (month.trim().length) params.month = month;
        if (day.trim().length) params.day = day;
        if (order.trim().length) params.order = order;
      }
    } else {
      const dragInit = getDragInit();
      if (dragInit.dragKey) {
        params.idname = dragInit.dragKey;
      }
        
      if (term) {
        params.id = term;
      } else if (dragInit.dragKeyValue) {
        params.id = dragInit.dragKeyValue;
      }
      params.orderBy = 'orderIndex';
      params.order = 'ASC';
    }
    // if (moreQueries) {
    //   if (moreQueries.length) {
    //     moreQueries.forEach(queryObj => {
    //       params[queryObj.query] = queryObj.value;
    //     })
    //   }
    // }
    console.log(params, 'useSearch');
    console.log(isRearrangeMode, 'Rearrange Mode');
    axios
      .post(`/${menuName}`, {}, {
        headers: { access_token: getToken() },
        params
      })
      .then(res => {
        console.log(res, ',,,,inside Then');
        if (!isRearrangeMode) {
          setData(prevData => {
            return [...prevData, ...res.data.results];
            // return res.data.results
          });
          setHasMore(res.data.next !== undefined);
          // setHasMore(res.data.results.length > 0)
        } else {
          setData(res.data.results);
        }
        setTotalResults(res.data.totalResults);
      })
      .catch(err => {
        errorHandler(null, setError, err);
      })
      .finally(_ => {
        setLoading(false);
        dispatch(setIsPressed(false));
        dispatch(setIsDatabaseChanged(false));
      });
  }

  useEffect(() => {
    if (getToken() && isAuthenticatedRedux && (isPressed || isDatabaseChanged)) {
      setData([]);
      dispatch(setPage(1));
      console.log('111-1')
      console.log(previousPage, page)
      if (
        (isDatabaseChanged && previousPage === page && term === '' && order === '' && isDateEmpty)
        || (isPressed && previousPage === page && page && term === '' && order === '' && isDateEmpty)
      ) {
        search();
        console.log('111-2')
      }
    }
  }, [isPressed, isDatabaseChanged]);

  useEffect(() => {
    console.log(previousPage, page)
    if (previousPage > page || previousPage < page) {
      if (previousPage > page) setData([]);
      search();
      console.log('222')
    }
  },[page]);

  useEffect(() => {
    if (getToken() && isAuthenticatedRedux) {
      setData([]);
      dispatch(setPage(1));
      console.log('333-1')
      console.log(previousTerm, term)
      console.log(previousOrder, order)
      console.log(previousPage, page)
      console.log(previousPath, path)
      if (
        (
          previousPath !== path
          && previousPage === page
          && term === ''
          && order === ''
        )
      || (
        (previousTerm !== term || previousOrder !== order)
        && previousPage === page
        )
      || (isAuthenticatedRedux && previousPath === path)   
      ) {
        search();
        console.log('333-2')
      }
    }
  }, [term, order, path, isAuthenticatedRedux]);

  return { data, totalResults, loading, error, hasMore };
}

export default useSearch;
