import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  setPath, setComponent, setIsForbidden, setIsNotFound, setIsSameComponent, setIsNavPathChanged
} from '../store/actions/pathAction';
import { Error, Loading, MenuCard, NoItem } from '../components';
import { getClass } from '../utils/auth';
import useAuthentication from '../hooks/useAuthentication';
import { menus } from '../utils/constants';
import { Container, Form, Card, Row, Col } from 'react-bootstrap';
import { formatTitle } from '../utils/format';

export default function Home() {
  const isAuthenticated = useAuthentication();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [adminClass, setAdminClass] = useState(getClass());
  const [loading, setLoading] = useState(true);
  const { isAuthenticatedRedux, authError } = useSelector(state => state.authReducer);
  const { term } = useSelector(state => state.searchReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setPath(path));
    dispatch(setComponent('Home'));
    dispatch(setIsSameComponent(false));
    // dispatch(setIsNavPathChanged(false));
    dispatch(setIsForbidden(false));
    dispatch(setIsNotFound(false));
    setLoading(false);
  },[]);

  useEffect(() => {
    setAdminClass(getClass());
  },[isAuthenticatedRedux]);

  useEffect(() => {
    if (term.trim() !== '') {
      const filtered = menus.filter(menu=> {
        if (adminClass === 'master') {
          if (formatTitle(menu.name, '-').toLowerCase().includes(term.toLowerCase())) {
            return menu;
          }
        } else if (adminClass === 'standard') {
          if (
            formatTitle(menu.name, '-').toLowerCase().includes(term.toLowerCase())
            && menu.class === "standard"
          ) return menu;
        }
      });
     setFilteredMenus(filtered);
    } else {
      let filtered = [];
      if (adminClass === 'master') {
        filtered = menus;
      } else if (adminClass === 'standard') {
        filtered = menus.filter(menu => {
          if (!menu.restricted) {
            return menu;
          }
        });
      }
      setFilteredMenus(filtered);
    }
  }, [term, adminClass]);

  if (!isAuthenticated || loading) {
    return <Loading/>
  }
  
  return (
    <>
      <Error authError={authError} />
      {/* <Link to={`/login`}>login-page</Link> */}
      {filteredMenus.length === 0 ? <NoItem text={"No results"} /> : (
          <>
            <Container fluid className="mt-4 mb-3">
              <Row xs={2} sm={4} lg={5} className="e-col-row-home">
                {
                  filteredMenus.map(menu => {
                    return <MenuCard menu={menu} key={menu.name} />
                  })
                }
              </Row>
            </Container>
          </>
        )
      }
    </>
  );
}
