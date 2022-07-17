import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authUser } from "store/user";

import { Button, TextField } from "@mui/material";
import Loader from "components/common/Loader";

import { useFormik } from "formik";
import * as Yup from "yup";

import config from "config.json";
import * as auth from "services/auth";
import * as toast from "services/toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(config.errors.form.email.invalid)
        .required(config.errors.form.email.empty),
      password: Yup.string(config.errors.form.password.invalid).required(
        config.errors.form.password.empty
      ),
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
    auth.register(
      credentials,
      (res) => {
        dispatch(authUser(res.data));
        navigate(config.routes.dashboard);
        toast.showSuccess(config.messages.login);
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
            <h1>New customers</h1>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(config.routes.login)}
            >
              Already registered
            </Button>
          </div>
          <div className="right">
            <h2>Register</h2>
            <div className="auth_container">
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
                    Register
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

export default Register;
