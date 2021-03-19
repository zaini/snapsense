const getFlagText = (flagValue) => {
  let res;
  switch (flagValue) {
    case 1:
      res = "Low Risk";
      break;
    case 2:
      res = "Medium Risk";
      break;
    case 3:
      res = "High Risk";
      break;
    default:
      res = "No Review";
      break;
  }
  return res;
};

export default getFlagText;
