import React from 'react';
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
 
export default function Action(
  { position, id, handleShowInfo, handleShowEdit, handleShowDeleteConfirm }
) {
  return (
    <>  
      <Container
        fluid
        className={`rounded bg-dark d-flex
          justify-content-${position} c-card
          actions-container h-100`}
      >
         <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>info</Tooltip>}      
        >
          <img
            className="action-button m-0"
            src={"/images/info.svg"}
            width="30"
            alt={"info-icon"}
            onClick={() => handleShowInfo(id)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>edit</Tooltip>}      
        >
          <img
            className="action-button ml-4"
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
            className="action-button ml-4"
            src={"/images/delete.svg"}
            width="30"
            alt={"delete-icon"}
            onClick={() => handleShowDeleteConfirm(id)}
          />
        </OverlayTrigger>
      </Container>
    </>
  );
}
