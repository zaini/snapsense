import { useForm } from "react-hook-form";
import Error from "../components/Error";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Error errors={errors} />

      <br />

      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="Password"
        ref={register({ required: true })}
      />
      <br />
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
