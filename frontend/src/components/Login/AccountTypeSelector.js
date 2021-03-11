import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

const AccountTypeSelector = ({ accountType, onAccountTypeChange }) => {
  return (
    <RadioGroup value={accountType} onChange={onAccountTypeChange}>
      <FormControlLabel
        value="PATIENT"
        control={<Radio />}
        label="🤒 Patient"
      />
      <FormControlLabel value="DOCTOR" control={<Radio />} label="👩‍⚕️ Doctor" />
      <FormControlLabel value="ADMIN" control={<Radio />} label="🤖 Admin" />
    </RadioGroup>
  );
};

export default AccountTypeSelector;
