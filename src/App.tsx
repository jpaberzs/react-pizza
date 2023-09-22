import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
// import NotFound from './pages/NotFound';

import './scss/app.scss';

const Cart = React.lazy((/* webpackChunkName: "CartPage" */) => import('./pages/Cart'));
const FullPizza = React.lazy((/* webpackChunkName: "FullPizza" */) => import('./pages/FullPizza'));
const NotFound = React.lazy((/* webpackChunkName: "NotFound" */) => import('./pages/NotFound'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
