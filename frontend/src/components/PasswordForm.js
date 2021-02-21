import React from "react";
import Button from '@material-ui/core/Button';
import { Container, TextField, List, ListItem, FormControl, InputLabel, Input, FormHelperText, Paper } from "@material-ui/core";
import { useForm } from 'react-hook-form';


const PasswordForm = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => console.log("Password updated"); // not working yet

    return (
        <Container>
            <h1>Change Password</h1>
            <Paper>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <List>
                        <ListItem>
                            {/* <FormControl variant="outlined">
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <Input id="email" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                            </FormControl> */}
                        </ListItem>
                        <ListItem>
                            <TextField
                                variant="outlined"
                                id="currentPassword"
                                name="currentPassword"
                                label="Current password"
                                type="password"
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                variant="outlined"
                                id="newPassword"
                                name="newPassword"
                                label="New password"
                                type="password"
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                variant="outlined"
                                id="checkPassword"
                                name="checkPassword"
                                label="Re-enter new password"
                                type="password"
                            />
                        </ListItem>
                        <ListItem>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            >
                                Save changes
                    </Button>
                        </ListItem>
                    </List>
                </form>
            </Paper>
        </Container>
    );
};



export default PasswordForm;
