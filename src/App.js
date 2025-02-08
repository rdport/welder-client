import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, MenuHome, DetailPage, ErrorPage } from './pages';
import { NavBar, ToolBar, SearchBar } from './components';
import { menus, errors } from './utils/constants';

function App() {
  return (
    <> 
      <NavBar />
      <ToolBar />
      <SearchBar />
      <Switch>
        {menus.map(menu => {
          if (menu.hasDetailPage) return (
          <Route path={`/${menu.name}/:id`} key={menu.name}>
            <DetailPage restricted={menu.restricted} menuName={menu.name} />
          </Route>
        )})}
        {menus.map(menu => (
          <Route path={`/${menu.name}`} key={menu.name}>
            <MenuHome restricted={menu.restricted} menuName={menu.name} />
          </Route>
        ))}
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <ErrorPage
            title={errors.notFound.title}
            src={errors.notFound.src}
            alt={errors.notFound.alt}
            width={errors.notFound.width}
            messages={errors.notFound.messages}
        />
        </Route>
        {/* <Route path="/details/:MovieId">
          <MovieDetail></MovieDetail>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route> */}
      </Switch>
      {/* <FloatingButton
        src={floatingButtons.scrollStart.src}
        alt={floatingButtons.scrollStart.alt}
        width={floatingButtons.scrollStart.width}
        x={floatingButtons.scrollStart.x}
        y={floatingButtons.scrollStart.y}
      /> */}
      {/* <FloatingButton
        src={floatingButtons.scrollEnd.src}
        alt={floatingButtons.scrollEnd.alt}
        width={floatingButtons.scrollEnd.width}
        x={floatingButtons.scrollEnd.x}
        y={floatingButtons.scrollEnd.y}
      /> */}
    </>
  );
}

export default App;
