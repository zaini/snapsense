import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Container, List, ListItem, ListItemText, Grid, Paper } from "@material-ui/core";

const UserInfo = (props) => {
  return (
    <Container className="UserInfo">
      <h1>Your information</h1>
      <Paper>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary="First name"
                  secondary={props.firstName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last name"
                  secondary={props.lastName}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={props.email}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <Button component={Link} to="/changeemail" color="primary">
              Change email
        </Button>
          </Grid>

          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Password"
                  secondary={props.password.substring(0,3) + "******"}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <Button component={Link} to="/changepassword" color="primary">
              Change password
        </Button>

          </Grid>
        </Grid>
      </Paper>
    </Container >
  );
}

export default UserInfo;
