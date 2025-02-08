import  { formatCamelCase, formatNonArrayErrorMessage } from './format';

export default function errorHandler(setFieldServerError, setNonFieldServerError, err, values) {
  if (err.response) {
    const errorMessage = err.response.data.message;
    console.log(errorMessage, "<<<<<<<<<<< 0")
    if (errorMessage === 'The email or password is incorrect') {
      setFieldServerError(errorMessage);
      console.log(errorMessage, "<<<<<<<<<1");
    } else if (err.response.status !== 400) {
      setNonFieldServerError(errorMessage);
      console.log(err.response);
      console.log(errorMessage, "<<<<<<<<<2");
    } else if (values) {
      const properties = Object.keys(values).filter(element => element !== 'id');
      let fieldError;
      if (Array.isArray(errorMessage)) {
        fieldError = properties.reduce((obj, property) => {
          const propertyName = formatCamelCase(property, null, 'all-lowercase');
          console.log(propertyName, '<<<<<<<propertyName')
          
          errorMessage.forEach(message => {
            if (message.toLowerCase().includes(propertyName)) {
              obj[property] = message;
            }
          });
          return obj;
        }, {});
        console.log(fieldError, "<<<<<<<<<3");
      } else {
        fieldError = {};
        for (const key in values) {
          if (errorMessage.includes(key)) {
            fieldError[key] = formatNonArrayErrorMessage(errorMessage);
          }
        }

        if (!Object.keys(fieldError).length) {
          setNonFieldServerError(errorMessage);
          console.log(errorMessage, "<<<<<<<<<4");
          return;
        }
      }
      setFieldServerError(fieldError);
      console.log(fieldError, "<<<<<<<<<5");
    } else {
      setNonFieldServerError(errorMessage);
    }
  } else {
    setNonFieldServerError(err.message);
    console.log(err.message, "<<<<<<<<<6");
  }
}
