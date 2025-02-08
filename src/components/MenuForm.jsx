import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Container, Button, Form } from 'react-bootstrap';
import { getToken } from '../utils/auth';
import { formatTitle, formatEditFormValue, formatCamelCase, formatUpperCaseSingular } from '../utils/format';
import { Input, Select, Loading, Error, MenuFormModal, FormButton } from '../components';
import axios from '../config/axiosinstance';
import { Formik } from 'formik';
import FormikEffect from '../components/FormikEffect';
import { getValidationSchema, getIsShallowEqual } from '../utils/get';
import errorHandler from '../utils/errorHandler';
import { swalAlert, swalToast } from '../utils/sweetAlert';
import { setIsDatabaseChanged, setIsRearrangeMode } from '../store/actions/formAction';
import { setTerm } from '../store/actions/searchAction';
import { setDragInit } from '../utils/rearrange';

export default function MenuForm(
  { 
    type, menuName, structureData, dataByPk, showForm,
    setDataByPk, handleCloseForm, handleCloseInfo, setError, id }
) {
  const [stateValues, setStateValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [fieldServerError, setFieldServerError] = useState(null);
  const [nonFieldServerError, setNonFieldServerError] = useState(null);
  const [onFocus, setOnFocus] = useState({});
  const dispatch = useDispatch();

  function handleFocus(name) {
    const onFocusObj = {};
    onFocusObj[name] = true;
    setOnFocus(onFocusObj);
  }

  function resetError() {
    setFieldServerError(null);
    setNonFieldServerError(null);
  }

  const add = async (values) => {
    setLoading(true);
    resetError();
    console.log(values, 'input valuesssssss')
    try {
      await axios.post(`/${menuName}/register`, values, {
        headers: { access_token: getToken() }
      });
      dispatch(setIsDatabaseChanged(true));
      setLoading(false);
      handleCloseForm();
      swalToast('Added to database', 'success');
    } catch (err) {
      setLoading(false);
      errorHandler(setFieldServerError, setNonFieldServerError, err, values);
    }
  }

  const edit = async (values) => {
    console.log(values, 'input valuesssssss')
    resetError();
    if (getIsShallowEqual(values, stateValues)) {
      swalAlert('No change!', 'The values in this form are still the same.', 'info');
    } else {
      setLoading(true);
      try {
        await axios.put(`/${menuName}/${id}`, values, {
          headers: { access_token: getToken() }
        });
        dispatch(setIsDatabaseChanged(true));
        setLoading(false);
        setDataByPk(null);
        handleCloseInfo();
        handleCloseForm();
        swalToast('Data edited', 'success');
      } catch (err) {
        setLoading(false);
        errorHandler(setFieldServerError, setNonFieldServerError, err, values);
      }
    }
  }

  const rearrange = (values) => {
    console.log(values, 'input valuesssssss')
    const dragKey = structureData[0].property;
    const value = Number(values[dragKey]);
    if (!value || !Number.isInteger(value) || value <= 0) {
      //set fieldServerError to handle validation error in case client validation fails
      const propertyName = formatCamelCase(dragKey, true);
      const error = { [dragKey]: `${propertyName} is invalid. It must be an integer greater than 0.` };
      setFieldServerError(error);
    } else {
      resetError();
      setDragInit(values);
      dispatch(setIsRearrangeMode(true));
      handleCloseForm();
    }
  }

  useEffect(() => {
    if (type === 'add' || type === 'rearrange') {
        setLoading(true);
        const initialValues = structureData.reduce((obj, element) => {
          if (element.tag) {
            obj[element.property] = '';
          }
          return obj;
        }, {});
        console.log(initialValues, "<<<<<<<<<<")
        setStateValues(currentStateValues => {
          return Object.assign({}, currentStateValues, initialValues);
        });
        setLoading(false);
    } else if (type === 'edit') {
      if (dataByPk?.id === id) {
        setStateValues(currentStateValues => {
          return Object.assign({}, currentStateValues, formatEditFormValue(dataByPk));
        });
        console.log('no loading');
      } else {
        setLoading(true);
        axios
          .post(`/${menuName}/${id}`, {}, {
            headers: { access_token: getToken() }
          })
          .then(({ data }) => {
            setStateValues(currentStateValues => {
              return Object.assign({}, currentStateValues, formatEditFormValue(data));
            });
            setDataByPk(data);
            setError(null);
          })
          .catch(err => {
            //display error on MenuForm, only when edit form has been loaded
            errorHandler(setFieldServerError, setNonFieldServerError, err);
            //display error on MenuHome, edit form is not loaded
            errorHandler(null, setError, err);
            //prevent show edit form button from becoming unusable after first error
            handleCloseForm();
          })
          .finally(_ => setLoading(false));
      }
    }
  }, []);

  if (!Object.keys(stateValues).length) {
    return (
      <MenuFormModal
        menuName={menuName}
        type={type}
        stateValues={stateValues}
        loading={loading}
        showForm={showForm}
        handleCloseForm={handleCloseForm}
      >
        <Loading />
      </MenuFormModal>
    );
  }

  if (Object.keys(stateValues).length) {
    return (
      <>
        <Formik
          validationSchema={getValidationSchema(structureData, type)}
          onSubmit={values => type === 'add' ? add(values) : 
            type === 'edit' ? edit(values) :
            rearrange(values)}
          initialValues={stateValues}
        >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <MenuFormModal
            menuName={menuName}
            type={type}
            stateValues={stateValues}
            loading={loading}
            showForm={showForm}
            handleCloseForm={handleCloseForm}
            handleSubmit={handleSubmit}
          >
            <Container fluid className="add-edit-form-container">
              <Error error={nonFieldServerError} />
              <Form noValidate>
                {/* Enable side effect to delete server error and display only client error 
                when any field input changes */}
                <FormikEffect onChange={resetError} />
                <Form.Row>
                {structureData.map(obj => {
                  if (type === 'add' && obj.editOnly) {
                    return;
                  } else {
                    switch (obj.tag) {
                      case 'input':
                        return (
                          <Input
                            key={obj.property}
                            field={obj}
                            formType={type}
                            handleChange={handleChange}
                            value={values?.[obj.property]}
                            touched={touched[obj.property]}
                            serverError={fieldServerError?.[obj.property]
                              ? fieldServerError[obj.property]
                              : null}
                            clientError={errors[obj.property] ? errors[obj.property] : null}
                            handleFocus={handleFocus}
                            isOnFocus={onFocus[obj.property]}
                          />
                        );
                      case 'select':
                        return (
                          <Select
                            key={obj.property}
                            menuName={menuName}
                            field={obj}
                            formType={type}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            values={values}
                            touched={touched[obj.property]}
                            dependencyValue={obj.dependency ? values?.[obj.dependency] : null}
                            serverError={fieldServerError?.[obj.property] ?
                              fieldServerError[obj.property] :
                              null}
                            clientError={errors[obj.property] ? errors[obj.property] : null}
                            setNonFieldServerError={setNonFieldServerError}
                            handleFocus={handleFocus}
                            isOnFocus={onFocus[obj.property]}
                          />
                        );
                    }
                  }
                })}
                </Form.Row>
              </Form>
            </Container>
          </MenuFormModal> 
        )}
        </Formik>
      </>
    );
  }
}
