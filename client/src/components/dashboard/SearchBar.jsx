import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";

const SearchBar = (props) => {
  const formik = useFormik({
    initialValues: { keywords: "" },
    validationSchema: Yup.object({
      keywords: Yup.string()
        .min(3, "You need to search for more than 3")
        .max(200, "You need to search for less than 200"),
    }),
    onSubmit: (values, { resetForm }) => {
      props.handleKeywords(values.keywords);
      resetForm();
    },
  });

  const errorHelper = (formik, value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText:
      formik.errors[value] && formik.touched[value]
        ? formik.errors[value]
        : null,
  });

  return (
    <div className="container">
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            label="Search"
            placeholder="Search for something"
            name="keywords"
            variant="outlined"
            {...formik.getFieldProps("keywords")}
            {...errorHelper(formik, "keywords")}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
