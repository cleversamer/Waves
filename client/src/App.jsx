/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "pages/home";
import NotFound from "pages/notFound";
import Login from "pages/auth/login";
import Register from "pages/auth/register";

import Header from "components/header";
import Footer from "components/footer";

import config from "config.json";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path={config.routes.register} element={<Register />} />
        <Route path={config.routes.login} element={<Login />} />
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

      <ToastContainer />

      <Footer />
    </Fragment>
  );
};

export default App;
