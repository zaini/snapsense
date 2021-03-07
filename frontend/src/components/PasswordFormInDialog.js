import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { Container, ListItem, FormControl, FormLabel, Input, FormHelperText, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { useForm } from 'react-hook-form';


const PasswordFormInDialog = () => {
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
                Change Password
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <ListItem>
                            <FormControl error={Boolean(errors.currentPassword)}>
                                <FormLabel>Current password</FormLabel>
                                <Input id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                />
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <FormControl error={Boolean(errors.newPassword)}>
                                <FormLabel>New password</FormLabel>
                                <Input id="newPassword" name="newPassword" type="password" inputRef={register({
                                    required: true
                                    // minLength: 5,
                                    // pattern: /^[0-9]+$/
                                })} />
                                <FormHelperText>
                                    {errors.newPassword
                                        && errors.newPassword.type === 'required'
                                        && <span>Please enter your new password</span>}
                                    {/* {errors.currentPassword
                                        && errors.currentPassword.type === 'minLength'
                                        && <span>Your password should be at least 5 characters</span>}
                                    {errors.currentPassword
                                        && errors.currentPassword.type === 'pattern'
                                        && <span></span>} */}
                                </FormHelperText>
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <FormControl error={Boolean(errors.reEnterPassword)}>
                                <FormLabel>Re-enter password</FormLabel>
                                <Input id="reEnterPassword" name="reEnterPassword" type="password" inputRef={register({
                                    required: true
                                })} />
                                <FormHelperText>
                                    {errors.reEnterPassword
                                        && errors.reEnterPassword.type === 'required'
                                        && <span>Please re-enter your password</span>}
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



export default PasswordFormInDialog;
