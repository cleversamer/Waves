import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authUser } from "store/user";

import { Button, TextField } from "@mui/material";
import Loader from "components/common/Loader";

import { useFormik } from "formik";
import * as Yup from "yup";

import config from "config.json";
import * as fetch from "services/fetch";
import * as toast from "services/toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("This is an invalid email")
        .required("Sorry the email is required"),
      password: Yup.string().required("Sorry the password is required"),
    }),
    onSubmit: (credentials) => {
      setLoading(true);
      handleSubmit(credentials);
    },
  });

  const errorHelper = (formik, value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText:
      formik.errors[value] && formik.touched[value]
        ? formik.errors[value]
        : null,
  });

  const handleSubmit = (credentials) => {
    fetch.login(
      credentials,
      (res) => {
        dispatch(authUser(res.data));
        navigate(config.routes.dashboard);
      },
      (err) => {
        toast.showError(err.response.data.message);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>Welcome back</h1>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum
            </p>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(config.routes.register)}
            >
              Need to register
            </Button>
          </div>
          <div className="right">
            <h2>Login</h2>
            <div>
              {loading ? (
                <Loader />
              ) : (
                <form
                  className="auth_container mt-3"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="email"
                      label="Enter your email"
                      variant="outlined"
                      {...formik.getFieldProps("email")}
                      {...errorHelper(formik, "email")}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      style={{ width: "100%" }}
                      name="password"
                      label="Enter your password"
                      variant="outlined"
                      type="password"
                      {...formik.getFieldProps("password")}
                      {...errorHelper(formik, "password")}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                  >
                    Login
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
