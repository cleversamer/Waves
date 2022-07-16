/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addProducts } from "store/products";

import Home from "pages/home";
import NotFound from "pages/notFound";

import Header from "components/header";
import Footer from "components/footer";

import * as fetch from "services/fetch";
import config from "config.json";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch.fetchAllProducts(
      { skip: 0, limit: 0 },
      (res) => {
        dispatch(addProducts(res.data));
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path={config.routes.notFound} element={<NotFound />} />
        <Route path={config.routes.home} element={<Home />} />
        <Route
          path="/"
          element={<Navigate to={config.routes.home} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={config.routes.notFound} replace />}
        />
      </Routes>

      <Footer />
    </Fragment>
  );
};

export default App;
