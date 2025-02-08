import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  setPath, setComponent, setIsForbidden, setIsNotFound, setIsSameComponent, setIsNavPathChanged
} from '../store/actions/pathAction';
import {
  Error, Loading, Action, NoItem, TableCard, TableHeader, MenuForm, Info, DeleteDialog
} from '../components';
import { getToken, getClass } from '../utils/auth';
import useAuthentication from '../hooks/useAuthentication';
import useSearch from '../hooks/useSearch';
import { setPage } from '../store/actions/searchAction';
import { getMenuData } from '../utils/get';
import { formatTitle } from '../utils/format';
import { errors } from '../utils/constants';
import { ErrorPage } from '../pages';
import { swalToast } from '../utils/sweetAlert';
import axios from '../config/axiosinstance';
import { setIsDatabaseChanged } from '../store/actions/formAction';
import errorHandler from '../utils/errorHandler';
import { getDragInit } from '../utils/rearrange';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import usePrevious from '../hooks/usePrevious';

export default function MenuHome({ menuName, restricted }) {
  const isAuthenticated = useAuthentication();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [adminClass, setAdminClass] = useState('');
  const [structureData, setStructureData] = useState([]);
  const { page, limit } = useSelector(state => state.searchReducer);
  const { authLoading, isAuthenticatedRedux, authError } = useSelector(state => state.authReducer);
  const { component, isForbidden, isSameComponent } = useSelector(state => state.pathReducer);
  const { isDatabaseChanged, isRearrangeMode } = useSelector(state => state.formReducer);
  const { noSearchBar } = useSelector(state => state.searchReducer);
  const { data, totalResults, loading, error, hasMore } = useSearch(menuName, path);
  // const [changeDatabaseLoading, setChangeDataBaseLoading] = useState(false);
  const [dataByPk, setDataByPk] = useState(null);
  const [id, setId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editError, setEditError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showPage, setShowPage] = useState(false);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const previousPath = usePrevious(path);

  const handleShowInfo = (id) => {
    setId(id);
    setShowInfo(true);
  };
  const handleCloseInfo = () => setShowInfo(false);

  const handleShowEdit = (id) => {
    setId(id);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleShowDeleteConfirm = (id) => {
    setId(id);
    setShowDeleteConfirm(true);
  };
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  // const handleDelete = (id) => {
  //   swalConfirm()
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         return axios.delete(`/${menuName}/${id}`, {
  //           headers: { access_token: getToken() }
  //         })      
  //       } else if (result.isDismissed) return;
  //     }).then(res => {
  //       if (res) {
  //         dispatch(setIsDatabaseChanged(true));
  //         setEditError(null);
  //         swalToast(res.data.message, 'success');
  //       }
  //     }).catch(err => {
  //       console.log(err.response)
  //       errorHandler(null, setDeleteError, err);
  //     })
  // };  

  //pagination in client, observerLE ("LE" stands for "Last Element")
  // const observerLE = useRef();
  // const lastElementRef = useCallback(node => {
  //   if (loading) return;
  //   if (observerLE.current) observerLE.current.disconnect();
  //   observerLE.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       dispatch(setPage(page + 1));
  //     }
  //   });
  //   if (node) observerLE.current.observe(node);
  // },[loading, hasMore]);

  const handleScroll = () => {
    const rootElement = document.documentElement;
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal === 1) {
      dispatch(setPage(page + 1));
      setIsInfiniteLoading(true);
      document.removeEventListener('scroll', handleScroll);
    }
  };

  const handleOnDragEnd = async (result) => {
    try {
      console.log(result);
      if (!result.destination || result.destination.index === result.source.index) return;
      const{ dragKeyValue: id } = getDragInit();
      const patchObj = {
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
        id
      }
      await axios.patch(`/${menuName}/${result.draggableId}`, patchObj, {
        headers: { access_token: getToken() }
      });
      dispatch(setIsDatabaseChanged(true));
      setDataByPk(null);
      setEditError(null);
      swalToast('Data updated', 'success');
    } catch (err) {
      errorHandler(null, setEditError, err);
    }
  };

  //avoid passsing down too many functions explicitly in props to the bottom component
  const actionComponent = (position, id) => {
    return(
      <Action
        position={position}
        id={id}
        handleShowInfo={handleShowInfo}
        handleShowEdit={handleShowEdit}
        handleShowDeleteConfirm={handleShowDeleteConfirm}
      />
    )
  };

  useEffect(() => {
    if (!isRearrangeMode) {
      setEditError(null);
    }
  },[isRearrangeMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setPath(path));
    dispatch(setComponent('MenuHome'));
    dispatch(setIsSameComponent(false));
    // dispatch(setIsNavPathChanged(false));
    dispatch(setIsForbidden(false));
    dispatch(setIsNotFound(false));
    if (restricted && getClass() !== 'master') {
      dispatch(setIsForbidden(true));
    }
    setStructureData(getMenuData(menuName, 'structureData'));
  },[path, adminClass]);
  
  useEffect(() => {
    if (!isDatabaseChanged && !isRearrangeMode) {
      window.scrollTo(0, 0);
    }
  },[isDatabaseChanged]);

  useEffect(() => {
    if (isAuthenticatedRedux) {
      setAdminClass(getClass());
      window.scrollTo(0, 0);
    }
  }, [isAuthenticatedRedux]);

  useEffect(() => {
    if (!loading) {
      if (page * limit < totalResults) {
        document.addEventListener('scroll', handleScroll);
      } else {
        document.removeEventListener('scroll', handleScroll);
      }
      setIsInfiniteLoading(false);
    }
  }, [loading]);

  // useEffect(() => {
  //   if () document.addEventListener('scroll', handleScroll);
  // }, [page, hasMore])

  useEffect(() => {
    if (component === 'MenuHome' && !authLoading && !loading && previousPath === path) setShowPage(true);
  }, [authLoading, loading]);

    if (isForbidden && !authLoading) {
    return (
      <ErrorPage
        title={errors.forbidden.title}
        src={errors.forbidden.src}
        alt={errors.forbidden.alt}
        width={errors.forbidden.width}
        messages={errors.forbidden.messages}
      />
    )
  }

  if (
    !isAuthenticatedRedux
    ||!isAuthenticated
    || authLoading
    // || (loading && (isRearrangeMode || !isRearrangeMode))
    || (component !== 'MenuHome' && !isSameComponent)
    || (component === 'MenuHome' && isSameComponent)
  ) return <Loading />

  if (showPage) {
    return (
      <div className={noSearchBar ? "no-search-bar-menu-home-container" : undefined}>
        {(error || authError || editError || deleteError) &&
          <Error error={error || editError || deleteError} authError={authError} />}
        <h3 className="text-center text-light mt-3">{formatTitle(menuName, '-')}</h3>
        {(!data?.length && !loading && !authLoading && component === 'MenuHome') ? 
          <NoItem text="No results"/> : 
          !isInfiniteLoading && loading ? <Loading /> :
          <>
            <div className="table-container">
              {totalResults !== 0 &&
                <h6 className="ml-3 font-weight-bold text-white">
                  {totalResults === 1 ? `${totalResults} result` : `${totalResults} results`}</h6>}
                <TableHeader structureData={structureData}></TableHeader>
                {!isRearrangeMode && 
                  data.map((element, index) => {
                    return (
                    // data.length === index + 1 ? (
                    //   <div ref={lastElementRef} key={element.id}>
                    //     <TableCard
                    //       structureData={structureData}
                    //       element={element}
                    //       index={index}
                    //       key={element.id}
                    //       actionComponent={actionComponent}
                    //     />
                    //   </div> 
                    // ) : (
                      <TableCard
                        structureData={structureData}
                        element={element}
                        index={index}
                        key={element.id}
                        actionComponent={actionComponent}
                      />
                    // )
                  )})
                }
                {(loading && page !== 1 && !isRearrangeMode) && (
                  <Loading className="spinner-container-infinite-loading" />
                )}
                
                
                {isRearrangeMode &&
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="table-droppable">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {data.map((element, index) => {
                            return (
                              <Draggable
                                key={element.id}
                                draggableId={`${element.id}`}
                                index={element.orderIndex}
                              >
                                {(provided) => (
                                  <TableCard
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    structureData={structureData}
                                    element={element}
                                    index={index}
                                    actionComponent={actionComponent}
                                  />
                                )}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                }
            </div>
            {showInfo && (
              <Info 
                menuName={menuName}
                structureData={structureData}
                showForm={showInfo}
                dataByPk={dataByPk}
                setDataByPk={setDataByPk}
                handleCloseForm={handleCloseInfo}
                handleShowEdit={handleShowEdit}
                handleDelete={handleShowDeleteConfirm}
                id={id}
              />
            )}
            {showEdit && (
              <MenuForm 
                type="edit"
                menuName={menuName}
                structureData={structureData}
                dataByPk={dataByPk}
                showForm={showEdit}
                setDataByPk={setDataByPk}
                handleCloseForm={handleCloseEdit}
                handleCloseInfo={handleCloseInfo}
                setError={setEditError}
                id={id}
              />
            )}
            {showDeleteConfirm && (
              <DeleteDialog 
                menuName={menuName}
                show={showDeleteConfirm}
                handleCloseForm={handleCloseDeleteConfirm}
                handleCloseInfo={handleCloseInfo}
                setError={setDeleteError}
                id={id}
              />
            )}
          </>
        }
      </div>
    );
  }

  return <Loading />
}
