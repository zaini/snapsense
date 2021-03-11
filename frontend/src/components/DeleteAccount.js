import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Button onClick={() => { setOpen(true) }} color="primary">
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
        </Container>
    );
};

export default DeleteAccount;

