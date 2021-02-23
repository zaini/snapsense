import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { Container, List, ListItem, FormControl, FormLabel, Input, FormHelperText } from "@material-ui/core";
import { useForm } from 'react-hook-form';


const PasswordForm = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordVisible(passwordVisible ? false : true);
    };

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <List>
                    <ListItem>
                        <FormControl error={Boolean(errors.currentPassword)}>
                            <FormLabel>Current password</FormLabel>
                            <Input id="currentPassword" name="currentPassword" type={passwordVisible ? "text" : "password"} />
                            {/* <i onClick={togglePasswordVisiblity}>{eye}</i>{" "} */}
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <FormControl error={Boolean(errors.newPassword)}>
                            <FormLabel>New password</FormLabel>
                            <Input id="newPassword" name="newPassword" type={passwordVisible ? "text" : "password"} inputRef={register({
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
                            <Input id="reEnterPassword" name="reEnterPassword" type={passwordVisible ? "text" : "password"} inputRef={register({
                                required: true
                            })} />
                            <FormHelperText>
                                {errors.reEnterPassword
                                    && errors.reEnterPassword.type === 'required'
                                    && <span>Please re-enter your password</span>}
                            </FormHelperText>
                        </FormControl>
                    </ListItem>

                    {/* <ListItem>
                        <TextField
                            variant="outlined"
                            id="checkPassword"
                            name="checkPassword"
                            label="Re-enter new password"
                            type={passwordVisible ? "text" : "password"}
                        />
                    </ListItem> */}

                    <ListItem>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Save changes
                    </Button>
                    </ListItem>

                </List>
            </form>
        </Container>
    );
};



export default PasswordForm;
