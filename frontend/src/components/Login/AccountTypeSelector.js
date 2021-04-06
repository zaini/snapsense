import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

const AccountTypeSelector = ({ accountType, onAccountTypeChange }) => {
  return (
    <RadioGroup value={accountType} onChange={onAccountTypeChange}>
      <FormControlLabel
        data-testid="labelPatient"
        value="PATIENT"
        control={<Radio data-testid="btnPatient" />}
        label="🤒 Patient"
      />
      <FormControlLabel
        data-testid="labelDoctor"
        value="DOCTOR"
        control={<Radio data-testid="btnDoctor" />}
        label="👩‍⚕️ Doctor"
      />
      <FormControlLabel
        data-testid="labelAdmin"
        value="ADMIN"
        control={<Radio data-testid="btnAdmin" />}
        label="🤖 Admin"
      />
      <FormControlLabel
        data-testid="labelSuperAdmin"
        value="SUPERADMIN"
        control={<Radio data-testid="btnSuperAdmin" />}
        label="🌟 SnapSense"
      />
    </RadioGroup>
  );
};

export default AccountTypeSelector;
