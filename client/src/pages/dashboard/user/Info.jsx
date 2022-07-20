import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "hoc/DashboardLayout";
import { TextField, Button } from "@mui/material";
import Loader from "components/common/Loader";

import { useDispatch, useSelector } from "react-redux";
import { selectUserData, updateUserProfile } from "store/user";

import { useFormik } from "formik";
import * as Yup from "yup";
import * as userService from "services/user";
import * as toast from "services/toast";
import config from "config.json";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.firstname,
      lastname: user.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "3 char min")
        .max(30, "30 char max")
        .required("Sorry, you need the firstname"),
      lastname: Yup.string()
        .min(3, "3 char min")
        .max(30, "30 char max")
        .required("Sorry, you need the lastname"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      userService.updateUserProfile(
        values,
        (res) => {
          dispatch(updateUserProfile(values));
          navigate(config.routes.dashboard);
          toast.showSuccess(config.messages.profileUpdated);
        },
        (err) => {
          console.log(err);
          const message = err.response.data
            ? err.response.data.message
            : err.message;
          toast.showError(message);
        },
        () => {
          setLoading(false);
        }
      );
    },
  });

  const errorHelper = (formik, value) => {
    return {
      error: formik.errors[value] && formik.touched[value],
      helperText:
        formik.errors[value] && formik.touched[value] && formik.errors[value],
    };
  };

  return (
    <DashboardLayout title="User information">
      <form
        className="mt-3 article_form"
        style={{ maxWidth: "300px" }}
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your firstname"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
            {...errorHelper(formik, "firstname")}
          />
        </div>

        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="lastname"
            label="Enter your lastname"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
            {...errorHelper(formik, "lastname")}
          />
        </div>

        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Edit profile
        </Button>
      </form>

      {isLoading && <Loader />}
    </DashboardLayout>
  );
};

export default UserInfo;
