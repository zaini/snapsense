import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Container, List, ListItem, ListItemText, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PasswordForm from "../components/PasswordForm.js";
import EmailForm from "../components/EmailForm.js";

const UserInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [pwVisible, setPasswordFormVisible] = useState(false)
  const [emailVisible, setEmailFormVisible] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

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
              <Button onClick={() => {
                if (pwVisible === 'true') setPasswordFormVisible('false')
                else setPasswordFormVisible('true')
              }} color="primary">
                Change password
        </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => {
                if (emailVisible === 'true') setEmailFormVisible('false')
                else setEmailFormVisible('true')
              }} color="primary">
                Change email
        </Button>
            </Grid>
          </Grid>
        </ListItem>


        {pwVisible === 'true' && (
          <Grid item xs={12}>
            <h2>Change password</h2>
            <Paper>
              <PasswordForm />
            </Paper>
          </Grid>
        )}

        {emailVisible === 'true' && (
          <Grid item xs={12}>
            <h2>Change email</h2>
            <Paper>
              <EmailForm />
            </Paper>
          </Grid>
        )}

        <ListItem>
          <Button onClick={() => {setOpen(true)}} color="primary">
            Delete account
      </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete something will happen, maybe disadvantage you...
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button onClick={handleClose, () => { alert('A request to delete your account has been sent to the admins') }} component={Link} to="/login" color="primary" autoFocus>
                Continue
          </Button>
            </DialogActions>
          </Dialog>
        </ListItem>

      </List>
    </Container >

  );
}

export default UserInfo;
