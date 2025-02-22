import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormButton } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { MenuForm } from '.';
import { getMenuData, getIsInMenus, getKeyFromMenu, getKeyFromStructureData } from '../utils/get';
import scrollTo from '../utils/scrollTo';
import { setIsRearrangeMode } from '../store/actions/formAction';
import { setNoSearchBar } from '../store/actions/searchAction';
import { resetDragInit } from '../utils/rearrange';

export default function ToolBar() {
  const { path, isForbidden, isNotFound } = useSelector(state => state.pathReducer);
  const isAuthenticatedRedux = useSelector(state => state.authReducer.isAuthenticatedRedux);
  const { isRearrangeMode } = useSelector(state => state.formReducer);
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [structureData, setStructureData] = useState([]);
  const [dragKey, setDragKey] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRearrangeForm, setShowRearrangeForm] = useState(false);
  const dispatch = useDispatch();

  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseRearrangeForm = () => setShowRearrangeForm(false);
  const handleShowRearrangeForm = () => setShowRearrangeForm(true);

  function scrollTop() {
    scrollTo(document.body, 0 ,800);
    scrollTo(document.documentElement, 0 , 800);
  }

  function handleRearrange() {
    if (dragKey && getKeyFromMenu(path, 'rearrangeable')) {
      handleShowRearrangeForm();
    } else {
      dispatch(setIsRearrangeMode(true));
      dispatch(setNoSearchBar(true));
    }
  }

  function handleExitRearrangeMode() {
    dispatch(setIsRearrangeMode(false));
    dispatch(setNoSearchBar(false));
    resetDragInit();
  }

  const handleScrollIcon = () => {
    const rootElement = document.documentElement;
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.1) {
      setShowScrollIcon(true);
    } else {
      setShowScrollIcon(false);
    }
  };

  useEffect(() => {
    if (getIsInMenus(path)) {
      const pathMenuName = path.split('/')[1];
      setMenuName(pathMenuName); 
      setStructureData(getMenuData(pathMenuName, 'structureData'));
      setDragKey(getKeyFromStructureData(path, 'autoFocusR', 'property'));
      document.addEventListener('scroll', handleScrollIcon);
    }
  }, [path]);

  if (!isAuthenticatedRedux) {
    return <></>;
  }
  
  return (
    <>
      {((path !== '/login') && (path !== '/') && isAuthenticatedRedux && !isForbidden
        && !isNotFound) && (
        <div className="toolbar-container">
          <div className="toolbar-container-left">
            {(getIsInMenus(path) && !isRearrangeMode) && 
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>add</Tooltip>}      
              >
                <img
                  onClick={handleShowAddForm} className="toolbar-icon"
                  src="/images/add-toolbar.svg" width="47"
                />
              </OverlayTrigger>
            }
            {(getKeyFromMenu(path, 'rearrangeable') && !isRearrangeMode) && 
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>rearrange</Tooltip>}      
              >
                <img
                  onClick={handleRearrange} className="toolbar-icon"
                  src="/images/rearrange.svg" width="37"
                />
              </OverlayTrigger>
            }
            {isRearrangeMode && 
              <FormButton
                type={'other'} variant={'danger'} text={'Exit Rearrange Mode'} tooltip={'stop rearranging'}
                onClick={handleExitRearrangeMode} addClassName="exit-rearrange-mode"
              />
            }
          </div>
          <div className="toolbar-container-right">
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>scroll to top</Tooltip>}      
            >
              <img
                onClick={scrollTop}
                className={`scroll-icon ${showScrollIcon ? 'show-scroll-icon' : ''}`}
                src="/images/scroll-top.svg"
                width="45"
              />
            </OverlayTrigger>
          </div>
        </div>
      )}
      {showAddForm && (
        <MenuForm 
          type="add"
          menuName={menuName}
          structureData={
            (getMenuData(path.split('/')[1], 'structureData')).filter(obj => obj.tag && !obj.editOnly)}
          showForm={showAddForm}
          handleCloseForm={handleCloseAddForm}
        />
      )}
      {showRearrangeForm && (
        <MenuForm 
          type="rearrange"
          menuName={menuName}
          structureData={
            (getMenuData(path.split('/')[1], 'structureData')).filter(obj => obj.autoFocusR !== undefined)}
          showForm={showRearrangeForm}
          handleCloseForm={handleCloseRearrangeForm}
        />
      )}
    </>
  )
}
