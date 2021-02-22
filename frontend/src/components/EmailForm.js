import React from "react";
import Button from '@material-ui/core/Button';
import { Container, List, ListItem, Paper, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { useForm } from 'react-hook-form';


const EmailForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <Container>
            <h1>Change Email</h1>
            <Paper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <List>

                        <ListItem>
                            <FormControl error={Boolean(errors.newEmail)}>
                                <InputLabel htmlFor="newEmail">New Email</InputLabel>
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
                        <ListItem><Button
                            type="submit"
                            variant="contained"
                            color="primary"
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



export default EmailForm;