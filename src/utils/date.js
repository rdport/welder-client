export function getYears(year, month, day) {
  const presentYear = new Date().getFullYear();
  const years = [];
  const leapYears = [];
  for (let i = 2020; i <= presentYear; i++) {
    years.push('' + i);
    if (i % 4 === 0) {
      leapYears.push('' + i);
    }
  }
  if (month === '02' && day === '29') {
    return leapYears;
  } else {
    return years;
  }
}

export function getMonths(year, month, day) {
  const months = [];
  let validMonths;
  for (let i = 1; i <= 12 ; i++) {
    if (i < 10) {
      months.push('0' + i);
    } else {
      months.push('' + i);
    }
  }
  if (Number(year) % 4 !== 0 && Number(day) >= 29) {
    validMonths = months.slice(2);
    validMonths.unshift('01');
    return validMonths;
  } else if (Number(day) === 31) {
    validMonths = ['01', '03', '05', '07', '08', '10', '12'];
    return validMonths;
  } else {
    return months;
  }
}

export function getDays(year, month, day) {
  const months30 = ['04', '06', '09', '11'];
  const days28 = getValidDays(28);
  const days29 = getValidDays(29);
  const days30 = getValidDays(30);
  const days31 = getValidDays(31);
  let isDayValid;
  if (Number(year) % 4 === 0 && month === '02') {
    return days29;
  } else if (Number(year) % 4 !== 0 && month === '02') {
    return days28;
  } else if (months30.includes(month)) {
    return days30;
  } else {
    return days31;
  }
}

function getValidDays(num) {
  const days = [];
  for (let i = 1; i <= num ; i++) {
    if (i < 10) {
      days.push('0' + i);
    } else {
      days.push('' + i);
    }
  }
  return days;
}
