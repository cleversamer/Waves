import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "pages/home";
import NotFound from "pages/notFound";

import Header from "components/header";
import Footer from "components/footer";

import * as fetch from "services/fetch";
import config from "config.json";

const App = () => {
  useEffect(() => {
    fetch
      .fetchAllProducts({ skip: 0, limit: 0 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
