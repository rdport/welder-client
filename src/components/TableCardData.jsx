import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCamelCase, formatTableData } from '../utils/format';

export default function TableCardData ({ category, element, obj, bg, text}) {
  const xs = obj[`xs${category[0].toUpperCase()}`];
  const sm = obj[`sm${category[0].toUpperCase()}`];
  const md = obj[`md${category[0].toUpperCase()}`];
  const lg = obj[`lg${category[0].toUpperCase()}`];
  const xl = obj[`xl${category[0].toUpperCase()}`];

  let dataClassName = '';
  let labelClassName = 'c-card-label-info text-warning';
  let colClassName = 'e-col-info';
  let linkIconName = 'link-f0ad4e.svg';

  if (category === 'list') {
    if (obj.currency) {
      dataClassName = 'text-md-right';
    } else if (obj.textPosition) {
      dataClassName = `text-md-${obj.textPosition}`;
    } else {
      dataClassName = 'text-md-center';
    }
    labelClassName = `c-card-label text-${obj.text || 'warning'}`
    linkIconName = `${obj.bg ? 'link-000000' : 'link-f0ad4e'}.svg`
    colClassName = 'e-col';
  }

  const cardData = () => {
    return (
      <Card bg={bg || 'dark'} text={text || 'white'} border="dark" className="c-card h-100"
      >
        <div className={obj.link ? 'card-table-data-container-link' : undefined}>
          <div>
            <Card.Text className={`${labelClassName}`}>
              {formatCamelCase(obj.property, obj.withId, 'titlecase')}
            </Card.Text>
            <Card.Text className={`m-2 ${dataClassName}`}>
              {formatTableData(element, obj)}
            </Card.Text>
          </div>
          {obj.link &&
            <img
              alt="link-icon" src={`images/${linkIconName}`}
              width="30" height="30" className="link-icon"
            />
          }
        </div>
      </Card>
    );
  }

  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={`${colClassName}`}>
      {obj.link ? (
        <Link className="link" to={`${obj.link}/${element.id}`}>
          {cardData()}
        </Link>
      ) : (
        cardData()
      )}
    </Col> 
  );
}