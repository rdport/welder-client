import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useAuthentication from '../hooks/useAuthentication';
import {
  setComponent, setIsNotFound, setIsSameComponent, setIsNavPathChanged
 } from '../store/actions/pathAction';

export default function ErrorPage({ title, messages, src, alt, width }) {
  const isAuthenticated = useAuthentication();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setComponent('ErrorPage'));
    dispatch(setIsSameComponent(false));
    // dispatch(setIsNavPathChanged(false));
    if (title === 'Page Not Found') {
      dispatch(setIsNotFound(true));
    }
  }, [])

  return (
    <>
      <Container fluid className="error-page-container">
        <h1 className="mt-5 text-light">Oops!</h1>
        <h1 className="text-light">{title}</h1>
        <img className="mt-5 mb-5" src={src} alt={alt} width={width} />
        {messages.map(message => <h5 className="text-light" key={message}>{message}</h5>)}
      </Container>
    </>
  );
}
