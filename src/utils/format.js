import { getFullName, getValueFromKey } from './get';

function convertCamelCase(splitted, keyword) {
  let result = '';
  for (let i = 0; i < splitted.length; i++) {
    if (i === 0) {
      result += (keyword === 'titlecase' || keyword === 'first-letter-only-uppercase') ?
        splitted[i].toUpperCase() :
        splitted[i].toLowerCase();
    } else if (i === splitted.length - 1) {
      result += splitted[i];
    } else if (
        splitted[i + 1] === splitted[i + 1].toUpperCase()
        && splitted[i] !== ' '
        && splitted[i + 1] !== ' '
      ) {
      result += `${splitted[i]} `;
    } else if (splitted[i] === splitted[i].toUpperCase()) {
      result += keyword === 'titlecase' ?
        splitted[i].toUpperCase() :
        splitted[i].toLowerCase();
    } else {
      result += splitted[i];
    }
  }
  return result;
}

export function formatCamelCase(property, withId, keyword) {
  const splitted = withId === false ?
    property.split('').slice(0, property.length - 2) :
    property.split('');
  if (
    property.slice(property.length - 2, property.length) === 'Id'
    && withId !== false
    && keyword !== "all-lowercase"
  ) {
    return convertCamelCase(splitted, 'titlecase');
  } else return convertCamelCase(splitted, keyword);
}

export function formatCurrency (price) {
  return `$${Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export function formatDateTime(dateTime) {
  const months = [];
      months[1] = "Jan";
      months[2] = "Feb";
      months[3] = "Mar";
      months[4] = "Apr";
      months[5] = "May";
      months[6] = "Jun";
      months[7] = "Jul";
      months[8] = "Aug";
      months[9] = "Sep";
      months[10] = "Oct";
      months[11] = "Nov";
      months[12] = "Dec";
  const d = new Date(dateTime);	// Convert the timestamp to milliseconds
  const yyyy = d.getFullYear();
  const mm = ('0' + (d.getMonth() + 1)).slice(-2);	// Months are zero based. Add leading 0.
  const dd = ('0' + d.getDate()).slice(-2);			// Add leading 0.
  const hh = d.getHours();
  let h = hh;
  const min = ('0' + d.getMinutes()).slice(-2);	// Add leading 0.
  let ampm = 'AM';
  if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
  } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
  } else if (hh === 0) {
      h = 12;
  }
  const monthName = months[Number(mm)];
  const time = h + ':' + min + ' ' + ampm;
  const timeStamp= `${dd} ${monthName} ${yyyy}, ${time}`;
  return timeStamp;
}

export function formatTitle(str, separator = ' ') {
  const splitted = str.split(separator);
  const firstLetterUpperCase = splitted.map(word => {
    let newWord = '';
      for (let i = 0; i < word.length; i++) {
        if (i === 0) {
          newWord += word[i].toUpperCase();
        } else {
          newWord += word[i];
        }
      }
    return newWord;
  });
  const result = firstLetterUpperCase.join(' ');
  return result;
}

export function formatUpperCase(str, separator = ' ') {
  const splitted = str.split(separator);
  const words = splitted.map(word => {
    let newWord = '';
      for (let i = 0; i < word.length; i++) {
          newWord += word[i].toUpperCase();
      }
    return newWord;
  });
  const result = words.join(' ');
  return result;
}

export function formatUpperCaseSingular(str, separator = ' ') {
  const splitted = str.split(separator);
  const words = splitted.map((word, index) => {
    let newWord = '';
      for (let i = 0; i < word.length; i++) {
        if (i === word.length - 1 && index === splitted.length - 1) {
          newWord += '';
        } else {
          newWord += word[i].toUpperCase();
        }
      }
    return newWord;
  });
  const result = words.join(' ');
  return result;
}

export function formatEditFormValue(data) {
  let result = {};
  for (const key in data) {
    if (typeof data[key] === 'object') {
      if (Object.keys(data[key]).length) {
        for (const key2 in data[key]) {
          if (key2 === 'id') {
            result[key + 'Id'] = data[key][key2];
          }
        }
      }
    } else {
      result[key] = data[key];
    }
  }
  return result;
}

export function formatNonArrayErrorMessage(errorMessage) {
  return errorMessage.split('_')[0];
}

export function formatTableData(data, structureDataObj) {
  if (String(data[structureDataObj.key || structureDataObj.property]).trim() !== '') {
    if (structureDataObj.firstNamePath) {
      return getFullName(data, structureDataObj);
    } else if (structureDataObj.currency) {
      return formatCurrency(getValueFromKey(
        data, structureDataObj.key || structureDataObj.property)
      );
    } else if (structureDataObj.dateTime) {
      return formatDateTime(getValueFromKey(
        data, structureDataObj.key || structureDataObj.property)
      );
    } else {
      return getValueFromKey(data, structureDataObj.key || structureDataObj.property );
    }
  } else {
    return '-';
  } 
}
