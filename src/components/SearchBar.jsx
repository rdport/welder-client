import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { SearchGroup, Error } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { menus } from '../utils/constants';
import useDebounce from '../hooks/useDebounce';
import {
  setTerm, setKey, setYear, setMonth, setDay, setOrder, setIsPressed, resetSearchBar
} from '../store/actions/searchAction';
import { getYears, getMonths, getDays } from '../utils/date';
import { formatCamelCase } from '../utils/format';
import { getSearchEnabledPaths } from '../utils/get';
import { getDragInit } from '../utils/rearrange';
import { setIsDatabaseChanged, setIsRearrangeMode } from '../store/actions/formAction';
import Loading from './Loading';
import { setAuthLoading } from '../store/actions/authAction';

export default function SearchBar() {
  const [searchEnabledPaths, setSearchEnabledPaths] = useState([]);
  const orderEnabledPaths = ['/account-transactions', '/transactions'];
  const dispatch = useDispatch();
  const { path, isForbidden, isNotFound } = useSelector(state => state.pathReducer);
  const { authLoading, isAuthenticatedRedux } = useSelector(state => state.authReducer);
  const { isDatabaseChanged, isRearrangeMode } = useSelector(state => state.formReducer);
  const { noSearchBar } = useSelector(state => state.searchReducer);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [structureData, setStructureData] = useState([]);
  const [values, setValues] = useState({});
  const [onFocus, setOnFocus] = useState({});
  const [error, setError] = useState(null);
  const debouncedValue = useDebounce(values.term, 500);

  function handleFocus(event) {
    const onFocusObj = {};
    onFocusObj[event.target.name] = true;
    setOnFocus(onFocusObj);
  }

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'key':
        dispatch(setKey(value));
        dispatch(resetSearchBar());
        break;
      case 'year':
        dispatch(setYear(value));
        break;
      case 'month':
        dispatch(setMonth(value));
        break;
      case 'day':
        dispatch(setDay(value));
        break;
      case 'order':
        dispatch(setOrder(value));
        break;
      case 'term':
        setError(null);
        if (isRearrangeMode) {
          const dragInit = getDragInit();
          const dragKey = dragInit.dragKey;
          const numberValue = Number(value);
          if (value !== '') {
            if (!numberValue || !Number.isInteger(numberValue) || numberValue <= 0) {
              //set fieldServerError to handle validation error in case client validation fails
              const propertyName = formatCamelCase(dragKey, true);
              const error = [`${propertyName} is invalid`];
              setError(error);
            }
          }
        }
        break;
    }
    setValues(currentValues => {
      if (name === 'key') {
        currentValues.term = '';
        currentValues.year = '';
        currentValues.month = '';
        currentValues.day = '';
      }
      currentValues[name] = value;
      return currentValues;
    });
    setSearchEnabledPaths(currentSearchEnabledPaths => {
     return Object.assign([], currentSearchEnabledPaths);
    })
  }

  function search(event) {
    event.preventDefault();
    dispatch(setIsPressed(true));
  }

  function initialize() {
    dispatch(setKey(''));
    dispatch(resetSearchBar());
    setSearchEnabledPaths(getSearchEnabledPaths());
    setOnFocus({});
    dispatch(setIsRearrangeMode(false));
    setError(null);
    const obj = menus.find(menu => {
      if (path === `/${menu.name}`) {
        return menu;
      }
    });
    if (obj) {
      const foundData = obj.structureData.find(element => element.bg === 'warning');
      const value = foundData.key || foundData.property;
      dispatch(setKey(value));
      setValues({
        key: value,
        year: '',
        month: '',
        day: '',
        term: ''
      })
      setStructureData(obj.structureData);
    } else {
      setValues({
        key: '',
        year: '',
        month: '',
        day: '',
        term: ''
      })
    }
  }

  useEffect(() => {
    if (!error) {
      dispatch(setTerm(debouncedValue));
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!isRearrangeMode) {
      setError(null);
      dispatch(resetSearchBar());
      setValues(currentValues => {
        currentValues['term'] = '';
        return currentValues;
      });
    } else {
      setValues(currentValues => {
        currentValues['term'] = getDragInit().dragKeyValue;
        return currentValues;
      });
    }
    setStructureData(currentStructureData => {
      return Object.assign([], currentStructureData);
    });
  }, [isRearrangeMode]);

  useEffect(() => {
    initialize();
  }, [path]);

  useEffect(() => {
    if (isDatabaseChanged) initialize();
  }, [isDatabaseChanged]);

  useEffect(() => {
    const years = getYears(values.year, values.month, values.day);
    const months = getMonths(values.year, values.month, values.day);
    const days = getDays(values.year, values.month, values.day);
    setYears(years);
    setMonths(months);
    setDays(days);
  }, [values.year, values.month, values.day]);

  if (!searchEnabledPaths.includes(path) && path !== '/') return <></>;

  if (
    (
      !isAuthenticatedRedux
      || authLoading
      || !structureData.length
    )
    && (path !== '/')
  ) return <div className="search-bar-placeholder"></div>;

  return (
    <>
      {(
        (searchEnabledPaths.includes(path) || path === '/')
        && isAuthenticatedRedux
        && !isForbidden
        && !isNotFound
        && !noSearchBar
      ) && (
        <>
          <Container fluid className="search-container">
            <Form.Row>
            {path !== '/' &&
              <SearchGroup
                name={'key'} tag={'select'} values={values} xs={12} md={'auto'}
                handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
              >
                {structureData.length !== 0 && structureData.map(obj=> {
                  if (isRearrangeMode) {
                    if (obj.autoFocusR) {
                      return (
                        <option
                          value={obj.key ?  obj.key : obj.property}
                          key={obj.property}
                        >
                          {formatCamelCase(obj.property, obj.withId)}
                        </option>
                      );
                    }
                  } else {
                    if (obj.xsL || obj.smL || obj.mdL || obj.lgL || obj.xlL) {
                      return (
                        <option
                          value={obj.key ?  obj.key : obj.property}
                          key={obj.property}
                        >
                          {formatCamelCase(obj.property, obj.withId)}
                        </option>
                      );
                    }
                  }
                })}
              </SearchGroup>
              // <Form.Group as={Col} xs={12} md={'auto'}>
              //   <Form.Label srOnly>key</Form.Label>
              //   <Form.Control
              //     as="select" name="key" value={values.key}
              //     onChange={handleInputChange} onFocus={handleFocus}
              //     style={getNormalStyle(onFocus.key)}
              //   >
              //     {structureData.length !== 0 && structureData.map(obj => {
              //       if (obj.xsL || obj.smL || obj.mdL || obj.lgL || obj.xlL) return (
              //         <option
              //           value={obj.key ?  obj.key : obj.property}
              //           key={obj.property}
              //         >
              //           {formatCamelCase(obj.property, obj.withId)}
              //         </option>
              //       )
              //     })}
              //   </Form.Control>
              // </Form.Group>
            }
           
            {values?.key.includes('date') && 
              <>
                <SearchGroup
                  name={'year'} tag={'select'} values={values} xs={4} md={'auto'}
                  handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
                >
                  <option value="">- year -</option>
                  {years.map(year => <option key={year}>{year}</option>)}
                </SearchGroup>

                <SearchGroup
                  name={'month'} tag={'select'} values={values} xs={4} md={'auto'}
                  handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
                >
                  <option value="">- month -</option>
                  {months.map(month => <option key={month}>{month}</option>)}
                </SearchGroup>

                <SearchGroup
                  name={'day'} tag={'select'} values={values} xs={4} md={'auto'}
                  handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
                >
                  <option value="">- day -</option>
                    {days.map(day => <option key={day}>{day}</option>)}
                </SearchGroup>

                {/* <Form.Group as={Col} xs={4} md={'auto'}>
                  <Form.Label srOnly>year</Form.Label>
                  <Form.Control
                    as="select" name="year"
                    value={values.year} onChange={handleInputChange}
                  >
                    <option value="">- year -</option>
                    {years.map(year => <option key={year}>{year}</option>)}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} xs={4} md={'auto'}>
                  <Form.Label srOnly>month</Form.Label>
                  <Form.Control
                    as="select" name="month"
                    value={values.month} onChange={handleInputChange}
                  >
                    <option value="">- month -</option>
                    {months.map(month => <option key={month}>{month}</option>)}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} xs={4} md={'auto'}>
                  <Form.Label srOnly>day</Form.Label>
                  <Form.Control
                    as="select" name="day"
                    value={values.day} onChange={handleInputChange}
                  >
                    <option value="">- day -</option>
                    {days.map(day => <option key={day}>{day}</option>)}
                  </Form.Control>
                </Form.Group> */}
              </>
            }

            {orderEnabledPaths.includes(path) && 
              <>
                <SearchGroup
                  name={'sortBy'} tag={'select'} defaultValue={'sort by input order'} xs={8} md={'auto'}
                  handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
                >
                  <option>sort by input order</option>
                </SearchGroup>
                {/* <Form.Group className="" as={Col} xs={8} md={'auto'}>
                  <Form.Label srOnly>order</Form.Label>
                  <Form.Control as="select" name="sortBy" defaultValue={'sort by input order'}>
                    <option>sort by input order</option>
                  </Form.Control>
                </Form.Group> */}
                <SearchGroup
                  name={'order'} tag={'select'} defaultValue={'DESC'} xs={4} md={'auto'}
                  className="order-search-sm"
                  handleInputChange={handleInputChange} handleFocus={handleFocus} onFocus={onFocus}
                >
                  <option>ASC</option>
                  <option>DESC</option>
                </SearchGroup>

                {/* <Form.Group className="order-search-sm" as={Col} xs={4} md={'auto'}>
                  <Form.Label srOnly>order</Form.Label>
                  <Form.Control
                    as="select" name="order"
                    defaultValue={'DESC'} onChange={handleInputChange}
                  >
                    <option>ASC</option>
                    <option>DESC</option>
                  </Form.Control>
                </Form.Group> */}
              </>
            }
            {(
              values.year.trim() !== ''
              || values.month.trim() !== ''
              || values.day.trim() !== ''
            ) ? (
              <Col>
                <Button type="button" className="search-button" onClick={search}>
                  <img
                    className=""
                    src={"/images/search.svg"}
                    width="37"
                    height="37"
                    alt={"search-icon"}
                  />
                  <div>Search</div>
                </Button>
              </Col>
            ) : (
              path === '/' ? (
                <div className="search-bar-home">
                  <SearchGroup
                    name={'term'} values={values} xs={12} sm={8} lg={5}
                    type="text" placeholder="search ..." handleInputChange={handleInputChange}
                    handleFocus={handleFocus} onFocus={onFocus}
                  />
                  {/* <Form.Group as={Col} xs={12} sm={8} lg={5}>
                    <Form.Label srOnly>terms</Form.Label>
                    <Form.Control
                      type="text" placeholder="search ..." name="term"
                      value={values.term} onChange={handleInputChange}
                    />
                  </Form.Group> */}
                </div>
              ) : (
                <SearchGroup
                  name={'term'} values={values} xs={12} md={5}
                  type={isRearrangeMode ? "number" : "text"}
                  placeholder={isRearrangeMode ? "an integer greater than 0" : "search ..."}
                  handleInputChange={handleInputChange}
                  handleFocus={handleFocus} onFocus={onFocus}
                />
                // <Form.Group as={Col} xs={12} md={5}>
                //   <Form.Label srOnly>terms</Form.Label>
                //   <Form.Control
                //     className="input-box"
                //     type="text" placeholder="search ..." name="term"
                //     value={values.term} onChange={handleInputChange}
                //   />
                // </Form.Group>
              )
            )}
            {error && 
              <Col>
                <Error error={error[0]} className="search-bar-error" />
              </Col>
            }
            </Form.Row>
          </Container>
        </>
      )}
      {/* <div className="text-light">{JSON.stringify(values.key)}</div>
      <div className="text-light">{JSON.stringify(values.year)}</div>
      <div className="text-light">{JSON.stringify(values.month)}</div>
      <div className="text-light">{JSON.stringify(values.day)}</div>
      {noSearchBar && <div className="text-light">{JSON.stringify(noSearchBar)}</div>}
      <div className="text-light">{JSON.stringify(structureData)}</div>
      {isNotFound && <div className="text-light">{JSON.stringify(isNotFound)}</div>}
      <div className="text-light">{JSON.stringify(isForbidden)}</div>
      <div className="text-danger mt-5 mb-5">{JSON.stringify(isNavPathChanged)} NAVPATH</div>
      <div className="text-danger mt-5 mb-5">{JSON.stringify(path)} PATH</div>
      <div className="text-light">{noSearchBar}</div>
      <div className="text-danger mt-5">{JSON.stringify(isSameComponent)}</div> */}
    </>
  );
}
