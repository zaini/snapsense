import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { Button, Input, InputAdornment } from "@material-ui/core";
import { MailOutline, LockOutlined } from "@material-ui/icons";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Error errors={errors} />
      <br />
      <Input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        startAdornment={
          <InputAdornment position="start">
            <MailOutline />
          </InputAdornment>
        }
      />
      <br />
      <br />
      <Input
        type="password"
        placeholder="Password"
        name="Password"
        ref={register({ required: true })}
        startAdornment={
          <InputAdornment position="start">
            <LockOutlined />
          </InputAdornment>
        }
      />
      <br />
      <br />
      <Button name="submit" variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
