import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProfile = ({ user, onSubmit }) => {
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
    onSubmit,
  });

  const errorHelper = (formik, value) => {
    return {
      error: formik.errors[value] && formik.touched[value],
      helperText:
        formik.errors[value] && formik.touched[value] && formik.errors[value],
    };
  };

  return (
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
  );
};

export default EditProfile;
