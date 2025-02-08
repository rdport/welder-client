import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormButton  } from '../components';
import { formatTitle, formatUpperCaseSingular } from '../utils/format';

export default function MenuFormModal ({ children, menuName, type, stateValues, loading, showForm, handleCloseForm, handleSubmit }) {
  const isStateValuesEmpty = !Object.keys(stateValues).length;
  return (
    <Modal
        show={showForm}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
        centered
        className="menu-form-modal"
        size={type === 'rearrange' ? 'md' : 'lg'}
    >
      <Modal.Header className="menu-form-header" closeButton>
        <div className="title-container-form">
          <Modal.Title className="main-title-form">
            {formatUpperCaseSingular(menuName, '-')}
          </Modal.Title>
          <Modal.Title>
            {formatTitle(type, '-')}
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="menu-form-body">
        {children}
      </Modal.Body>
      <Modal.Footer className="menu-form-footer">
        {(type === 'add' && !isStateValuesEmpty) && 
          <FormButton
            type={'add'} variant={'primary'}
            loading={loading} onClick={handleSubmit}
          />
        }
        {(type === 'edit' && !isStateValuesEmpty) &&
          <FormButton
            type={type} variant={'warning'}
            loading={loading} onClick={handleSubmit}
          />
        }
        {(type === 'rearrange' && !isStateValuesEmpty) && 
          <FormButton
            type={'other'} variant={'info'} text={'Next'}
            loading={loading} onClick={handleSubmit}
          />
        }
        <FormButton
          type={'other'} variant={'danger'} text={'Cancel'}
          onClick={handleCloseForm}
        />
      </Modal.Footer>   
    </Modal>
  );
}