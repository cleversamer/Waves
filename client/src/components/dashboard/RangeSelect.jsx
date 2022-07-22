import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  Button,
} from "@mui/material";

const RangeSelect = (props) => {
  const [open, setOpen] = useState(props.initState);
  const handleCollapseOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: { min: 0, max: 5000 },
    validationSchema: Yup.object({
      min: Yup.number().min(0, "The minimum is 0"),
      max: Yup.number().max(10000, "The max is 10.000"),
    }),
    onSubmit: (values) => {
      props.handleRange([values.min, values.max]);
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
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title} className="collapse_title" />
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
              <div>
                <TextField
                  label="$ Min"
                  name="min"
                  variant="outlined"
                  type="number"
                  {...formik.getFieldProps("min")}
                  {...errorHelper(formik, "min")}
                />
              </div>
              <br />
              <div>
                <TextField
                  label="$ Max"
                  name="max"
                  variant="outlined"
                  type="number"
                  {...formik.getFieldProps("max")}
                  {...errorHelper(formik, "max")}
                />
              </div>
              <br />
              <Button
                type="submit"
                className="mt-3"
                variant="outlined"
                color="secondary"
                size="large"
                style={{ width: "100%" }}
              >
                Search
              </Button>
            </form>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default RangeSelect;
