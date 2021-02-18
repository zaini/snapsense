const LoginForm = ({ accountType, onAccountTypeChange }) => {
  return (
    <div onChange={onAccountTypeChange}>
      <input type="radio" value="patient" checked={accountType === "patient"} />
      Patient
      <input type="radio" value="doctor" checked={accountType === "doctor"} />
      Doctor
    </div>
  );
};

export default LoginForm;
