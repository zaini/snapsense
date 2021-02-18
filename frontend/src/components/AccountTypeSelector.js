import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

const LoginForm = ({ accountType, onAccountTypeChange }) => {
  return (
    <RadioGroup value={accountType} onChange={onAccountTypeChange}>
      <FormControlLabel
        value="patient"
        control={<Radio />}
        label="🤒 Patient"
      />
      <FormControlLabel value="doctor" control={<Radio />} label="👩‍⚕️ Doctor" />
    </RadioGroup>
  );
};

export default LoginForm;
