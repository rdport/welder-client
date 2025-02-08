import React, { useCallback } from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import { formatCamelCase }  from '../utils/format';
import { getErrorValidationStyle, getNormalStyle } from '../utils/get';

export default function Input({
  field, formType, handleChange, value, touched,
  clientError, serverError, handleFocus, isOnFocus }) {

  const { property, withId, type, autoFocusF, autoFocusR, lgF, xlF, xsR, validationChains } = field;
  
  const focusRef = useCallback(node => {
    if (node) {
      setTimeout(() => node.focus(), 1);
    }
  },[]);

  return (
    <Form.Group
      as={Col}
      lg={formType !== 'rearrange' ? lgF : undefined}
      xl={formType !== 'rearrange' ? xlF : undefined}
      className="mt-lg-3 mb-lg-3"
    >
      <Form.Label className="font-weight-bold text-warning">
        {formatCamelCase(property, withId, 'titlecase')}
        {validationChains.includes('required') && <span className="asterisk-required">{' '}&#42;</span>}
      </Form.Label>
      <Form.Control
        name={property}
        type="text"
        value={value}
        onChange={handleChange}
        isInvalid={touched && !!clientError}
        style={serverError ? getErrorValidationStyle(isOnFocus) : getNormalStyle(isOnFocus)} 
        ref={(formType === "rearrange" && autoFocusR) ? focusRef : (autoFocusF ? focusRef : () => {})}
        onFocus={() => handleFocus(property)}
      >
      </Form.Control>
      <Form.Control.Feedback type="invalid">{clientError}</Form.Control.Feedback>
      <Container className="feedback-container">
          <Form.Text className="feedback">{serverError}</Form.Text>
        </Container>
    </Form.Group>
  );
}
