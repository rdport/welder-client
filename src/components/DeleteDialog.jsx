import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { swalToast } from '../utils/sweetAlert';
import axios from '../config/axiosinstance';
import { useDispatch } from 'react-redux';
import { getToken } from '../utils/auth';
import { setIsDatabaseChanged } from '../store/actions/formAction';
import errorHandler from '../utils/errorHandler';

export default function DeleteDialog({ menuName, show, handleCloseForm, handleCloseInfo, setError, id }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log('delete')
    axios.delete(`/${menuName}/${id}`, {
      headers: { access_token: getToken() }
    })
    .then(res => {
      dispatch(setIsDatabaseChanged(true));
      handleCloseInfo();
      handleCloseForm();
      setError(null);
      swalToast(res.data.message, 'success');
    }).catch(err => {
      console.log(err.response)
      errorHandler(null, setError, err);
    })
  }

  return (
    <Modal
      show={show}
      onHide={handleCloseForm}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-warning" closeButton>
        <Modal.Title className="delete-confirm-title">DELETE CONFIRMATION</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-light bg-dark">
        <img src="/images/warning.svg" width="100" height="100" className="error-logo" alt="error sign" />
        <h3>Are you sure?</h3>
        <h6>You won't be able to revert this!</h6>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="danger" onClick={() => handleDelete(id)}>
          Yes, delete it!
        </Button>
        <Button variant="secondary" onClick={handleCloseForm}>
          No, cancel!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}