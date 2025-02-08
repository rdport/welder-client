import React, { useState, useEffect, useCallback } from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import useFetchOptions from '../hooks/useFetchOptions';
import { formatCamelCase } from '../utils/format';
import { getErrorValidationStyle, getNormalStyle } from '../utils/get';

export default function Select({
  menuName, field, formType, handleChange, setFieldValue, values, touched,
  clientError, serverError, setNonFieldServerError, handleFocus, isOnFocus, dependencyValue
}) {

  const {
    property, withId, options, endPoint, optionValueProperty, autoFocusF, autoFocusR,
    lgF, xlF, xsR, dependency, association, validationChains
  } = field;

  const {
    data, loading, error
  } = useFetchOptions(menuName, options, endPoint, dependency, dependencyValue, association);

  const [optionProperty, setOptionProperty] = useState('');

  const focusRef = useCallback(node => {
    if (node) {
      setTimeout(() => node.focus(), 1);
    }
  },[]);

  useEffect(() => {
    let keyName;
    if (data.length) {
      const keys = Object.keys(data[0]);
      keys.forEach(key => {
        if (key !== 'id') { keyName = key }
      });
      setOptionProperty(keyName);
    }
    const val = data.length === 1 ?
      (optionValueProperty ?
      data[0][optionValueProperty] :
      data[0][keyName]) :
      values[property];
    setFieldValue(property, val);
  }, [data]);

  useEffect(() => {
    if (values[dependency] === '') {
      setFieldValue(property, '');
    }
  },[values])

  useEffect(() => {
    //display error on MenuForm when error happens in useFetchOptions
    if (error) {
      console.log(error)
      setNonFieldServerError(error);
    }
  },[error])

  return (
    <Form.Group
      as={Col}
      lg={formType !== 'rearrange' ? lgF : undefined}
      xl={formType !== 'rearrange' ? xlF : undefined}
      className="mt-lg-3 mb-lg-3"
    >
      <Form.Label
        className="font-weight-bold text-warning"
      >
        {formatCamelCase(property, withId, 'titlecase')}
        {validationChains.includes('required') && <span className="asterisk-required">{' '}&#42;</span>}
      </Form.Label>
      <Form.Control
        as="select"
        name={property}
        value={values[property]}
        onChange={handleChange}
        disabled={(loading || error) ? true : false}
        isInvalid={touched && !!clientError}
        style={serverError ? getErrorValidationStyle(isOnFocus) : getNormalStyle(isOnFocus)}  
        ref={(formType === "rearrange" && autoFocusR) ? focusRef : (autoFocusF ? focusRef : () => {})}
        onFocus={() => handleFocus(property)}     
      >
        <option value="">Choose...</option>
        {options ?
        options.map((option, index) => <option key={index}>{option}</option>) :
        data.map(option => {
          return (
            <option
              key={option.id}
              value={optionValueProperty ?
                option[optionValueProperty] :
                option[optionProperty]}
            >{option[optionProperty]}</option>
          )
        })}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{clientError}</Form.Control.Feedback>
      {serverError && (
        <Container className="feedback-container">
          <Form.Text className="feedback">{serverError}</Form.Text>
        </Container>
      )}
    </Form.Group>
  );
}
