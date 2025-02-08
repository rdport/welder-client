import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { formatCamelCase } from '../utils/format';

export default function TableHeader({ structureData }) {
  return (
    <> 
      <Container fluid className="c-header-card">
        <Row className="e-col-row flex-nowrap">
          <Col className="e-col" md={1}>
            <Container
              fluid 
              className="header-text-container-table"
            >
              <Card.Text className="header-text-table">#</Card.Text>
            </Container>
          </Col>
          {structureData.map(obj => {
            if (obj.xsL || obj.smL || obj.mdL || obj.lgL || obj.xlL) return (
              <Col className="e-col" md={obj.mdL} lg={obj.lgL} xl={obj.xlL} key={obj.property}>
                <Container
                    fluid 
                    className="header-text-container-table"
                >
                  <Card.Text className="header-text-table">
                    {formatCamelCase(obj.property, obj.withId, 'titlecase')}
                  </Card.Text>
                </Container>
              </Col>
            )
          })}
           <Col className="e-col" md={3} lg={2}>
              <Container
                  fluid 
                  className="header-text-container-table"
              >
                <Card.Text className="header-text-table">Actions</Card.Text>
              </Container>
            </Col>
        </Row>
      </Container>
    </>
  );
}
