import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import "./AccountTypeSelector.css";

const LoginForm = ({ accountType, onAccountTypeChange }) => {
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

    // <div class="main-container">
    //   <div class="radio-buttons">
    //     <label class="custom-radio">
    //       <input type="radio" name="radio" />
    //       <span class="radio-btn"
    //         ><i class="las la-check"></i>
    //         <div class="hobbies-icon">
    //           <i class="las la-band-aid"></i>
    //           <h3>Patient</h3>
    //         </div>
    //       </span>
    //     </label>
    //     <label class="custom-radio">
    //       <input type="radio" name="radio" />
    //       <span class="radio-btn"
    //         ><i class="las la-check"></i>
    //         <div class="hobbies-icon">
    //          <i class="las la-stethoscope"></i>
    //           <h3>Doctor</h3>
    //         </div>
    //       </span>
    //     </label>
    //     <label class="custom-radio">
    //       <input type="radio" name="radio" />
    //       <span class="radio-btn"
    //         ><i class="las la-check"></i>
    //         <div class="hobbies-icon">
    //           <i class="las la-hospital-symbol"></i>
    //           <h3>Admin</h3>
    //         </div>
    //       </span>
    //     </label>
    //   </div>
    // </div>
  );
};

export default LoginForm;
