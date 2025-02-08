import  { formatCamelCase, formatNonArrayErrorMessage } from './format';

export default function errorHandler(setFieldServerError, setNonFieldServerError, err, values) {
  if (err.response) {
    const errorMessage = err.response.data.message;
    if (errorMessage === 'The email or password is incorrect') {
      setFieldServerError(errorMessage);
    } else if (err.response.status !== 400) {
      setNonFieldServerError(errorMessage);
    } else if (values) {
      const properties = Object.keys(values).filter(element => element !== 'id');
      let fieldError;
      if (Array.isArray(errorMessage)) {
        fieldError = properties.reduce((obj, property) => {
          const propertyName = formatCamelCase(property, null, 'all-lowercase');
          
          errorMessage.forEach(message => {
            if (message.toLowerCase().includes(propertyName)) {
              obj[property] = message;
            }
          });
          return obj;
        }, {});
      } else {
        fieldError = {};
        for (const key in values) {
          if (errorMessage.includes(key)) {
            fieldError[key] = formatNonArrayErrorMessage(errorMessage);
          }
        }

        if (!Object.keys(fieldError).length) {
          setNonFieldServerError(errorMessage);
          return;
        }
      }
      setFieldServerError(fieldError);
    } else {
      setNonFieldServerError(errorMessage);
    }
  } else {
    setNonFieldServerError(err.message);
  }
}
