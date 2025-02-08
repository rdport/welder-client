import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { logout, logoutAll, getAdminFullName } from '../utils/auth';
import { swalAlert } from '../utils/sweetAlert';
import { setIsSameComponent, setIsNavPathChanged } from '../store/actions/pathAction';
import { ProjectInfo } from '../components';

export default function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path, component } = useSelector(state => state.pathReducer);
  const authLoading = useSelector(state => state.authReducer.authLoading);
  const isAuthenticatedRedux = useSelector(state => state.authReducer.isAuthenticatedRedux);
  const [fullName, setFullName] = useState('');
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // function triggerRequestMenuHome() {
  //   dispatch(setIsNavPathChanged(true));
  //   if (component === 'MenuHome') {
  //     dispatch(setIsSameComponent(true));
  //   }
  // }

  async function signOut(type) {
    try {
      const data = type === 'single' ? await logout() : await logoutAll();
      handleClose();
      history.push('/login');
      swalAlert('See you soon!', data.message, 'success');
      console.log(data.message);
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.message;
        console.log(err.response.data.message);
      } else {
        message = err.message;
        console.log(err.message);
      }
      swalAlert('Sign out failed', message, 'error');
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowInfo = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

  useEffect(() => {
    if (!authLoading || isAuthenticatedRedux) setFullName(getAdminFullName());
  }, [authLoading, isAuthenticatedRedux]);

  if (!isAuthenticatedRedux) {
    return <></>;
  }

  return (
    <>
      {(path !== '/login' && isAuthenticatedRedux) && (
        <>
          <Navbar fixed="top" bg="dark" variant="dark" text="white" expand="lg">
            <NavLink exact to="/">
              <Navbar.Brand>
                <img
                  alt="phoenix-company-logo"
                  src="/images/rdia.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                Welder
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                {/* <NavLink className="nav-link" activeClassName="active" exact to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/datebooks">
                  Datebooks
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/customers">
                  Customers
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/suppliers">
                  Suppliers
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/stocks">
                  Stocks
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/shoppings">
                  Shopping-Lists
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" exact to="/references">
                  References
                </NavLink> */}
                <li className="nav-item" onClick={handleShowInfo}>
                  <div className="nav-link d-flex align-items-center info-tab">
                    <img src="/images/info2.svg" width="30" height="30" className="d-inline-block align-top mr-1" alt="info logo" loading="lazy" />
                    Info
                  </div>
                </li>
              </Nav>
              
              <Nav className="ml-auto">
                <NavDropdown title={fullName}>
                  <NavDropdown.Item onClick={handleShow}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You can sign out only on this browser or on all devices.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => signOut('single')}>
                Only on this browser
              </Button>
              <Button variant="secondary" onClick={() => signOut('multiple')}>
                On all devices
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <ProjectInfo showForm={showInfo} handleCloseForm={handleCloseInfo}></ProjectInfo>
        </>
      )}
    </>
  );
}
