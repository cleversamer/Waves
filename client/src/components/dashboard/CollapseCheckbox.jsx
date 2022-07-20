import { useState } from "react";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
} from "@mui/material";

const CollapseCheckbox = (props) => {
  const [open, setOpen] = useState(props.initState);
  const [checked, setChecked] = useState([]);

  const handleCollapseOpen = () => setOpen(!open);

  const renderList = () =>
    props.list
      ? props.list.map((value) => (
          <ListItem key={value._id}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => handleToggle(value._id)}
                checked={checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapseOpen}>
          <ListItemText primary={props.title} className="collapse_title" />
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </ListItem>
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseCheckbox;
