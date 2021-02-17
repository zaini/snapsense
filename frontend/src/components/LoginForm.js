import React from "react";
import { Button, Grid, Paper, Avatar, TextField, Link, Typography} from "@material-ui/core";
import { useForm } from 'react-hook-form';
import {secureLogin} from './secure_login.svg';


const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  const paperStyle = {padding:20, height: '70vh', width: 300, margin: '20px auto'}

  return (
    <Grid  align = 'center'>
      <Paper elevation = {10} style = {paperStyle}>
        <img src={secureLogin}/>
        <Avatar>K</Avatar>
        <h2>Sign in</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" name="Last name" ref={register({required: true, maxLength: 100})} /> */}
      <TextField label = 'Email' type="text" placeholder="Enter Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} fullWidth required />
      <TextField label = 'Password' type="text" placeholder="Enter Password" name="Password" type="password" ref={register({required: true, max: 18, min: 0})} fullWidth required/>
      <Button type="submit" color = 'primary' variant = "contained" fullWidth>Login</Button>
      <Typography>
        <Link href="#">Forgot password?</Link>
      </Typography>
    </form>
    </Paper>
    </Grid>
  );
};

export default LoginForm;
