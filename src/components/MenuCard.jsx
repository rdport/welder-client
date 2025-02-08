import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { formatTitle } from '../utils/format';

export default function MenuCard({ menu }) {
  return (
    <>
      <Link className="link" to={menu.structureData ? `/${menu.name}` : ''}>  
        <Col className="menu-card-col-container e-col h-100">
          <Card className="menu-card h-100">
            <div className="menu-card-img-container">
              <Card.Img
                className="menu-img" variant="top"
                src={`/images/menus/${menu.name}.svg`} alt={menu.name}
              />
              {!menu.structureData && (
                <img className="construction-status-img" src="/images/hammer.svg" width={50}></img>
              )}
            </div>
            <Card.Title className="menu-title">{formatTitle(menu.name, '-')}</Card.Title>
          </Card>
        </Col>
      </Link>
    </>
  );
}
