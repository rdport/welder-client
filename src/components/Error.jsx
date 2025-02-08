import React from 'react';
import { Alert } from 'react-bootstrap';

export default function Error({ authError, error, className }) {
  if (authError && !error) {
    if (authError === "Unauthorized Access!") {
      return <></>
    }
  }
  return (
    <>
      {authError && 
        <Alert className={`text-center ${className || ''}`} variant="danger">
          {authError}
        </Alert>
      }
      { (error) && 
        <Alert className={`text-center ${className || ''}`} variant="danger">
          {error}
        </Alert>
      }
    </>
  );
}
