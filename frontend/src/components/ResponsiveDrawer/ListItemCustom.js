import React from "react";
import { Link } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const ListItemCustom = (props) => {
  return (
    <Link style={{ textDecoration: "none" }} href={props.link}>
      <ListItem button key={props.text}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
};

export default ListItemCustom;
