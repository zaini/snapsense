import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box, Container, List, ListItem, ListItemText, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PasswordForm from "../components/PasswordForm.js";
import EmailForm from "../components/EmailForm.js";

const UserInfo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [pwVisible, setPasswordFormVisible] = React.useState(false)
  const [emailVisible, setEmailFormVisible] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordForm = () => {
    if (pwVisible === 'true') setPasswordFormVisible('false')
    else setPasswordFormVisible('true')
  }

  const handleEmailForm = () => {
    if (emailVisible === 'true') setEmailFormVisible('false')
    else setEmailFormVisible('true')
  }

  return (

    <Container className="UserInfo">
      <h1>Your information</h1>
      <List>

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
          <Grid container direction="row" alignContent='space-around' alignItems="center" justify="center">
            <Grid item>
              <Button onClick={handleClickOpen} color="primary">
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
            </Grid>

            <Grid item>
              <Button onClick={handlePasswordForm} color="primary">
                Change password
        </Button>
            </Grid>

            <Grid item>
              <Button onClick={handleEmailForm} color="primary">
                Change email
        </Button>
            </Grid>
          </Grid>
        </ListItem>
        
        <ListItem>
          <Grid container>
            <Grid item xs={6} >
              {pwVisible === 'true' && (
                <Container>

                  <PasswordForm />
                </Container>
              )}
            </Grid>
            <Grid item xs={6}>
              {emailVisible === 'true' && (
                <Container>

                  <EmailForm />
                </Container>
              )}
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Container >

  );
}

export default UserInfo;
