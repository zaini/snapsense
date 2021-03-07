import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { Container, ListItem, FormControl, FormLabel, Input, FormHelperText, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { useForm } from 'react-hook-form';


const EmailFormInDialog = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Button onClick={() => { setOpen(true) }} color="primary">
                Change Email
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ListItem>
                            <FormControl error={Boolean(errors.newEmail)}>
                                <FormLabel>New email</FormLabel>
                                <Input id="newEmail" name="newEmail" type="text" inputRef={register({
                                    required: true,
                                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                                })} />
                                <FormHelperText>
                                    {errors.newEmail
                                        && errors.newEmail.type === 'required'
                                        && <span>Please enter your new email</span>}
                                    {errors.newEmail
                                        && errors.newEmail.type === 'pattern'
                                        && <span>Please enter valid email</span>}
                                </FormHelperText>
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                    </Button>
                            </DialogActions>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Save changes
                    </Button>
                        </ListItem>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};



export default EmailFormInDialog;
