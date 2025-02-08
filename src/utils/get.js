import { menus } from './constants';
import * as yup from 'yup';
import { formatCamelCase } from './format';

export function getErrorValidationStyle(isOnFocus) {
  return {
    borderColor: '#dc3545',
    borderWidth: '0.15rem',
    borderRadius: '0.5rem',
    boxShadow: isOnFocus ? "0 0 0 0.3rem #f8d7da" : ''
  }
}

export function getNormalStyle(isOnFocus, style) {
  const styleObj = {
    borderColor: isOnFocus ? '#007bff' : '',
    borderWidth: isOnFocus ? '0.1rem' : '0.15rem',
    borderRadius: '0.5rem',
    boxShadow: isOnFocus ? '0 0 0 0.3rem #cce5ff' : ''
  }
  if (style) {
    for (const key in style) {
      styleObj[key] = style[key]
    }
  }
  return styleObj;
}

export function getFullName(element, obj) {
  const splitted = obj.firstNamePath.split('_');
  const associationLevel = splitted.length - 1;
  if (!associationLevel) return `${element[obj.firstNamePath]} ${element[obj.lastNamePath]}`;
  return `${getValueFromKey(element, obj.firstNamePath)}
    ${getValueFromKey(element, obj.lastNamePath)}`;
}

export function getLink(menuName, id) {
  return `${menuName}/${id}`;
}

export function getMenuData(menuName, property) {
  const foundMenu = menus.find(menu => menu.name === menuName);
  return foundMenu[property];
}

export function getSearchEnabledPaths() {
  const results = [];
  menus.forEach(menu => results.push('/' + menu.name));
  return results;
}

export function getValidationSchema(structureData) {
  const fields = structureData.filter(element => element.tag);
  const message = {
    string: ' must be string',
    email: ' is invalid',
    number: ' must be numeric',
    integer: ' must be an integer',
    positive: ' must be greater than 0',
    required: ' is required'
  }
  const validationObj = {};
  fields.forEach(field => {
    const propertyName = formatCamelCase(
      field.property, field.withId, 'first-letter-only-uppercase'
    );
    validationObj[field.property] = yup;
    field.validationChains?.forEach(chain => {
      validationObj[field.property] = typeof chain === 'string' ?
        validationObj[field.property][chain](message[chain] ? propertyName + message[chain] : '') :
        validationObj[field.property][chain.name](
            chain.args, message[chain.name] ? propertyName + message[chain.name] : ''
          );
    });
  });
  const schema = yup.object().shape(validationObj);
  return schema;
}

export function getValueFromKey(obj, key) {
  let value;
  const splitted = key.split('_');
  const property = splitted[splitted.length - 1];
  const associationLevel = splitted.length - 1;
  if (!associationLevel) {
    value = obj[property];
    return value;
  }
  for (let i = 0; i < associationLevel; i++) {
    let newWord = '';
    const word = splitted[i];
    for (let j = 0; j < word.length; j++) {
      if (j === 0) {
        newWord += word[j].toUpperCase();
      } else {
        newWord += word[j];
      }
    }
    if (i === 0) {
      value = obj[newWord];
    } else {
      value = value[newWord];
    }
  }
  value = value[property];
  return value;
}

export function getIsInMenus(path) {
  return menus.some(menu => `/${menu.name}` === path);
}

export function getKeyFromMenu(path, key) {
  const foundMenu = menus.find(menu => `/${menu.name}` === path);
  return foundMenu?.[key];
}

export function getKeyFromStructureData(path, key1, key2) {
  const pathMenuName = path.split('/')[1];
  const { structureData } = menus.find(menu => menu.name === pathMenuName);
  const foundData = structureData.find(data => data[key1]);
  return foundData?.[key2];
}

export function getIsShallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (object1[key] !== object2[key]) return false;
  }
  return true;
}
