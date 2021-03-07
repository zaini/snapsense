import React from "react";
import { Container, List, ListItem, ListItemText, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PasswordFormInDialog from "../components/PasswordFormInDialog.js";
import EmailFormInDialog from "../components/EmailFormInDialog.js";
import DeleteAccount from "../components/DeleteAccount.js";

const UserInfo = (props) => {
  return (

    <Container className="UserInfo">
      <List>

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
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={props.email}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        <ListItem>
          <Grid container direction="row" alignContent='space-around' alignItems="center">
            <Grid item>

              <PasswordFormInDialog />

            </Grid>
            <Grid item>

              <EmailFormInDialog />

            </Grid>
            <Grid item>

              <DeleteAccount />

            </Grid>
          </Grid>
        </ListItem>

      </List>
    </Container >

  );
}

export default UserInfo;
