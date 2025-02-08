import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { TableCardData } from '../components';

export default function TableCard({ index, provided, innerRef, element, structureData, actionComponent, firstElementRef }) {
  return (
    <div {...provided?.draggableProps} {...provided?.dragHandleProps} ref={innerRef}>
      <Container fluid className="c-card-container">
        <Row className="e-col-row">
          <Col xs={12} sm={12} md={1} lg={1} xl={1} className="e-col">
            <Card bg="dark" text="white" border="dark" className="c-card h-100">
              <Container fluid className="index-container">
                <Card.Text className="mt-2 mb-1 c-index-data">{index + 1}</Card.Text>
                  {actionComponent && (
                    <div className="actions-index">
                      {actionComponent('end', element.id)}
                    </div>
                  )}
              </Container>
            </Card>
          </Col>
          {structureData.map(obj => {
            if (obj.xsL || obj.smL || obj.mdL || obj.lgL || obj.xlL) return (
              <TableCardData
                category={'list'}
                element={element}
                obj={obj}
                bg={obj.bg || 'dark'}
                text={obj.text || 'white'}
                key={obj.property}
              />
            )
          })}
          <Col md={3} lg={2} xl={2} className="e-col actions-end">
            {actionComponent && (
              <>
                {actionComponent('around', element.id)}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
