/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authUser, selectUserAuth } from "store/user";

import Home from "pages/home";
import NotFound from "pages/notFound";
import Login from "pages/auth/login";
import Register from "pages/auth/register";
import Dashboard from "pages/dashboard";
import UserInfo from "pages/dashboard/user/Info";

import Header from "components/header";
import Footer from "components/footer";

import config from "config.json";
import * as auth from "services/auth";
import * as toast from "services/toast";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const userAuth = useSelector(selectUserAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = auth.isAuth(
      (res) => {
        dispatch(authUser(res.data));
        toast.showSuccess(config.messages.login);
      },
      (err) => {
        if (cookie) {
          toast.showError(config.errors.auth.tokenExpired);
        }
      }
    );
  }, []);

  return (
    <Fragment>
      <Header />

      <Routes>
        {userAuth && (
          <>
            <Route path={config.routes.userInfo} element={<UserInfo />} />
            <Route path={config.routes.dashboard} element={<Dashboard />} />
          </>
        )}

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
