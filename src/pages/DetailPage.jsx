import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  setPath, setComponent, setIsForbidden, setIsNotFound, setIsSameComponent, setIsNavPathChanged
} from '../store/actions/pathAction';
import {
  Error, Loading, Action, NoItem, TableCard, TableHeader, MenuForm, Info
} from '../components';
import { getToken, getClass } from '../utils/auth';
import useAuthentication from '../hooks/useAuthentication';
import useSearch from '../hooks/useSearch';
import { setPage } from '../store/actions/searchAction';
import { getMenuData } from '../utils/get';
import { formatUpperCaseSingular } from '../utils/format';
import { errors } from '../utils/constants';
import { ErrorPage } from '../pages';
import { swalConfirm, swalToast } from '../utils/sweetAlert';
import axios from '../config/axiosinstance';
import { setIsDatabaseChanged } from '../store/actions/formAction';
import errorHandler from '../utils/errorHandler';
import { getDragInit } from '../utils/rearrange';

export default function DetailPage({ restricted, menuName }) {
  const isAuthenticated = useAuthentication();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [adminClass, setAdminClass] = useState('');
  const { authLoading, isAuthenticatedRedux, authError } = useSelector(state => state.authReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setPath(path));
    dispatch(setComponent('DetailPage'));
    dispatch(setIsSameComponent(false));
    // dispatch(setIsNavPathChanged(false));
    dispatch(setIsForbidden(false));
    dispatch(setIsNotFound(false));
    if (restricted && getClass() !== 'master') {
      dispatch(setIsForbidden(true));
    }
  },[path, adminClass]);

  useEffect(() => {
    if (isAuthenticatedRedux) setAdminClass(getClass());
  }, [isAuthenticatedRedux]);

  return (
    <>
      <div className="detail-page">
        <div className="d-flex justify-content-center">
          <h3 className="title-detail">{formatUpperCaseSingular(menuName, '-')}</h3>
        </div>
        <div className="container d-flex justify-content-center mt-4">
          <img className="" style={{borderRadius: '1rem'}} src="/images/under-construction.gif" width={300}></img>
        {/* <h3 className="customer-name-detail"></h3> */}
        </div>
      </div>
    </>
  );
}
