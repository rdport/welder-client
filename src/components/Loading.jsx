import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function Loading({ className }) {
  return (
    <>
      <Container className={`${className || "spinner-container"}`}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    </>
  );
}
