import { Form, Col } from 'react-bootstrap';
import { getNormalStyle } from '../utils/get';

export default function SearchGroup({
  children, name, tag, values, defaultValue, className, type, placeholder,
  handleInputChange, handleFocus, onFocus, style, xs, sm, md, lg
}) {
  return (
    <Form.Group as={Col} xs={xs} sm={sm} md={md} lg={lg}>
      <Form.Label srOnly>{name}</Form.Label>
      {values ? (
        <Form.Control
          as={tag} name={name} value={values[name]}
          className={className} type={type} placeholder={placeholder}
          onChange={handleInputChange} onFocus={handleFocus}
          style={getNormalStyle(onFocus[name], style)}
        >
          {children}
        </Form.Control>
      ) : (
        <Form.Control
          as={tag} name={name} defaultValue={defaultValue}
          className={className} type={type} placeholder={placeholder}
          onChange={handleInputChange} onFocus={handleFocus}
          style={getNormalStyle(onFocus[name])}
        >
          {children}
        </Form.Control>
      )}
    </Form.Group>
  );
}