import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditProfile = ({ user, onSubmit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "", newEmail: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please check your email", (email) => {
          return email === user.email;
        }),

      newEmail: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please check your email", (newEmail) => {
          return newEmail !== user.email;
        }),
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
          name="email"
          label="Enter your current email"
          variant="outlined"
          {...formik.getFieldProps("email")}
          {...errorHelper(formik, "email")}
        />
      </div>

      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="newEmail"
          label="Enter your new email"
          variant="outlined"
          {...formik.getFieldProps("newEmail")}
          {...errorHelper(formik, "newEmail")}
        />
      </div>

      <Button
        className="mb-3"
        variant="contained"
        color="primary"
        type="submit"
      >
        Edit email
      </Button>
    </form>
  );
};

export default EditProfile;
