import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Container, List, ListItem, ListItemText, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const UserInfo = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Button style={{minWidth: '170px'}} variant="contained" component={Link} to="/changeemail" color="primary">
              Change email
        </Button>
          </Grid>

          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Password"
                  secondary={props.password.substring(0, 3) + "******"}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <Button style={{minWidth: '170px'}} variant="contained" component={Link} to="/changepassword" color="primary">
              Change password
        </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid item xs={6}>
        <List>
          <ListItem>
            <Button color="primary" onClick={handleClickOpen}>
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
                <Button onClick={handleClose} component={Link} to="/login" color="primary" autoFocus>
                  Continue
          </Button>
              </DialogActions>
            </Dialog>
          </ListItem>
        </List>
      </Grid>

    </Container >
  );
}

export default UserInfo;
