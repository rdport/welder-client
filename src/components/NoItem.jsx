import React from 'react';
import { Container, Col, Card } from 'react-bootstrap';

export default function NoItem({ text }) {
  return (
    <>
      <Container fluid className="d-flex justify-content-center text-center mt-4">
        <Col xs sm={8} md={6} lg={4}>
          <Card className="no-item-card">
            <Card.Body>
              <Card.Title className="mt-2">{text}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}
