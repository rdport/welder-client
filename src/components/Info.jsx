import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Container, OverlayTrigger, Tooltip, Col, Row, Card } from 'react-bootstrap';
import useFetchInfo from '../hooks/useFetchInfo';
import { Loading, Error, TableCardData } from '../components';
import { formatTableData, formatUpperCaseSingular, formatCamelCase, formatTitle } from '../utils/format';
import { getKeyFromMenu } from '../utils/get';

export default function Info(
  { menuName, structureData, dataByPk, showForm, setDataByPk, 
    handleCloseForm, handleShowEdit, handleDelete, id }
) {
  const { data, loading, error } = useFetchInfo(menuName, id, dataByPk, setDataByPk);
  return (
    <>
      <Modal
        show={showForm}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
        centered
        className="menu-form-modal"
        size='lg'
      >
        <Modal.Header className="menu-form-header" closeButton>
          <div className="title-container-form">
            <Modal.Title className="main-title-form">
              {formatUpperCaseSingular(menuName, '-')}
            </Modal.Title>
            <Modal.Title>
              {formatTitle('info', '-')}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="menu-form-body-info">
          <Container fluid className="add-edit-form-container">
            <Error error={error} />
            <Row>
            {!data || loading ? <Loading /> : (
              structureData.map(obj => {
                if (obj.xsI || obj.smI || obj.mdI || obj.lgI || obj.xlI) return (
                  <TableCardData category={'info'} element={data} obj={obj} key={data.property}/>
                );
                  // <Col
                  //   xs={obj.xsI} sm={obj.smI} md={obj.mdI} lg={obj.lgI} xl={obj.xlI}
                  //   className="e-col-info" key={obj.property}
                  // >
                  //   <Card
                  //     bg="dark"
                  //     text="white"
                  //     border="dark"
                  //     className="c-card h-100"
                  //   >
                  //     <Card.Text className={"c-card-label-info text-warning"}>
                  //       {formatCamelCase(obj.property, obj.withId, 'titlecase')}
                  //     </Card.Text>
                  //     <Card.Text className="m-2 align-items-center">
                  //       {formatTableData(data, obj)}
                  //     </Card.Text>
                  //   </Card>
                  // </Col>
                // )
              })
            )} 
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="info-footer">
          {/* {getKeyFromMenu('/' + menuName, 'hasDetailPage') &&
            <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>go to details</Tooltip>}      
            >
              <Link>
                <img
                  className="action-button ml-0 mr-3"
                  src={"/images/details.svg"}
                  width="23"
                  alt={"edit-icon"}
                  onClick={() => handleShowDetails(id)}
                />
              </Link>
            </OverlayTrigger>
          } */}
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>edit</Tooltip>}      
          >
            <img
              className="action-button ml-5"
              src={"/images/edit.svg"}
              width="30"
              alt={"edit-icon"}
              onClick={() => handleShowEdit(id)}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>delete</Tooltip>}      
          >
            <img
              className="action-button ml-5"
              src={"/images/delete.svg"}
              width="30"
              alt={"delete-icon"}
              onClick={() => handleDelete(id)}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>back</Tooltip>}      
          >
            <img
              className="action-button ml-5"
              src={"/images/back.svg"}
              width="30"
              alt={"back-icon"}
              onClick={() => handleCloseForm()}
            />
          </OverlayTrigger>
        </Modal.Footer>   
      </Modal>
    </>
  );
}
