import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import {
  setPath, setComponent, setIsForbidden,
  setIsNotFound, setIsSameComponent, setIsNavPathChanged
} from '../store/actions/pathAction';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from '../config/axiosinstance';
import { login, setUtilPath } from '../utils/auth';
import useAuthentication from '../hooks/useAuthentication';
import {
  setAuthLoading, setIsAuthenticatedRedux, setAuthError
} from '../store/actions/authAction';
import { swalAlert } from '../utils/sweetAlert';
import errorHandler from '../utils/errorHandler';
import { Loading, ProjectInfo } from '../components';
import { loginFields } from '../utils/constants';
import { getValidationSchema, getErrorValidationStyle } from '../utils/get';
import { Formik } from 'formik';
import FormikEffect from '../components/FormikEffect';

export default function Login() {
  const isAuthenticated = useAuthentication();
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [fieldServerError, setFieldServerError] = useState(null);
  const [nonFieldServerError, setNonFieldServerError] = useState(null);
  const { authLoading, authError } = useSelector(state => state.authReducer);
  const [onFocus, setOnFocus] = useState({});
  const [showPage, setShowPage] = useState(false);
  const [showInfo, setShowInfo]= useState(true);
  const allowedAuthError = ['Session expired', 'Network Error', 'Internal Server Error'];

  function handleFocus(name) {
    const onFocusObj = {};
    onFocusObj[name] = true;
    setOnFocus(onFocusObj);
  }

  function handleCloseInfo() {
    setShowInfo(false)
  }

  function resetError() {
    dispatch(setAuthError(null));
    setFieldServerError(null);
    setNonFieldServerError(null);
    dispatch(setAuthLoading(false));
  }

  async function signIn(values) {
    try {
      setNonFieldServerError(null);
      dispatch(setAuthLoading(true));
      const { data } = await axios.post('/admins/login', values);
      const accessToken = data.accessToken;
      const adminClassName = data.class;
      const adminFullName = data.fullName;
      login({ accessToken, adminClassName, adminFullName });
      dispatch(setAuthLoading(false))
      dispatch(setIsAuthenticatedRedux(true));
      resetError();
      history.push('/');
      swalAlert('Logged In!', 'Welcome!', 'success');
    } catch (err) {
      resetError();
      errorHandler(setFieldServerError, setNonFieldServerError, err);
    } 
  }

  useEffect(() => {
    dispatch(setPath(path));
    dispatch(setComponent('Login'));
    dispatch(setIsSameComponent(false));
    setUtilPath(path);
    // dispatch(setIsNavPathChanged(false));
    dispatch(setIsForbidden(false));
    dispatch(setIsNotFound(false));
    if (isAuthenticated) { 
      history.push('/');
    }
  },[isAuthenticated]);

  useEffect(() => {
    setShowPage(true);
  }, [authLoading])

  if (!isAuthenticated && authLoading) return <Loading />
  
  if (showPage) {
    return (
      <>
        <Container className="login-page">
          <Container className="shadow login-form-background">
            <Container className="login-form-container">
              <div className="text-center">
                <img
                  src="/images/rdia.svg"
                  className="login-logo"
                  alt="phoenix-company-logo"
                  width="150"
                  height="150"
                />
                <div class="login-image-container">
                <img class="" src="/images/Welder-white.svg" alt="welder" width="150"></img>
              </div>
              </div>
              <Card className="shadow login-form-card">
                <Formik
                  validationSchema={getValidationSchema(loginFields)}
                  onSubmit={values => signIn(values)}
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FormikEffect onChange={resetError}/>
                      <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name ="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                          style={fieldServerError ? getErrorValidationStyle(onFocus['email']) : {}}
                          onFocus={() => handleFocus('email')}                      
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
    
                      <Form.Group className="mb-0">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name ="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.password}
                          style={fieldServerError ? getErrorValidationStyle(onFocus['password']) : {}}                      
                          onFocus={() => handleFocus('password')}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
    
                      {(fieldServerError|| nonFieldServerError || (allowedAuthError.includes(authError))) &&
                        <Form.Text className="text-danger mt-3 mb-0">
                          {fieldServerError ? fieldServerError : (
                            nonFieldServerError ? nonFieldServerError : authError
                          )}
                        </Form.Text>}
                      <Button
                        className="login-btn mt-3"
                        variant="primary"
                        type="submit"
                        onClick={resetError}
                      >
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Container>
          </Container>
        </Container>
        <ProjectInfo
          showForm={showInfo}
          handleCloseForm={handleCloseInfo}
        >
        </ProjectInfo>
      </>
    );
  }

  return <Loading />
}
