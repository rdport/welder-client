import React from 'react'
import { Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { formatTitle } from '../utils/format';

export default function FormButton({ type, variant, size, text, tooltip, loading, onClick, addClassName }) {
  const ButtonComponent = () => {
      return ((type === 'add' || type === 'edit') ? (
        <Button
          type="button" onClick={onClick} variant={variant} size={size}
          className={`form-button ${addClassName}`}>
          {loading ? formatTitle(type) + 'ing' : formatTitle(type)}
          {loading &&  <Spinner animation="border" size="sm" className="ml-2"/>}
        </Button>
      ) : (
        <Button
          type="button" onClick={onClick} variant={variant} size={size}
          className={`form-button ${addClassName}`}
        >
          {text}
        </Button>
      ))
  }
  if (!tooltip) {
    return (
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>{tooltip || ''}</Tooltip>}
      >      
        <ButtonComponent />
      </OverlayTrigger>
    );
  } else {
    return <ButtonComponent />
  }
}