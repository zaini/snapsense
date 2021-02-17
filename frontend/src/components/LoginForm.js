import React from "react";
import LockOpenIcon from '@material-ui/icons/LockOpen';
//import {Formik} from 'formik'
// import {secureLogin} from "frontend/src/secure_login.svg";
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Paper,
  Avatar,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

const LoginForm = (props) => {
  const { register, handleSubmit, errors, handleChange, value } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <Grid align="center">
      <Paper elevation={10} style={paperStyle}>
      {/* <img src={secureLogin} /> */}
        <h2>Sign into SnapSense AI</h2>
        <Avatar></Avatar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="text"
            placeholder="Enter Email"
            name="Email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            name="Password"
            type="password"
            ref={register({ required: true, max: 18, min: 0 })}
            fullWidth
            required
          />

          <FormControl component="fieldset">
            <div height= "100px"></div>
            <FormLabel component="legend">I am a</FormLabel>
            <RadioGroup 
              aria-label="userType" 
              name="userType1" 
              value={value} 
              onChange={handleChange}>
              <Grid> 
              <FormControlLabel 
              value="patient" 
              control={<Radio />} 
              label="Patient" 
              labelPlacement = "bottom"
              />
              <FormControlLabel 
              value="doctor" 
              control={<Radio />} 
              label="Doctor" 
              labelPlacement = "bottom"

              />
              </Grid>
            </RadioGroup>
          </FormControl>



          
          <Button 
            type="submit" 
            color="primary" 
            variant="contained" 
            fullWidth>
            Login
          {/* <LockOpenIcon /> */}
          </Button>
          <Typography>
            <Link href="#">Forgot password?</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: "75vw",
  margin: "20px auto",
};

export default LoginForm;
