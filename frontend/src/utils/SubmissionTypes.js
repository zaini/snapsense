const getSubmissionTypeText = (typeValue) => {
  let res;
  switch (typeValue) {
    case 1:
      res = "Questionnaire";
      break;
    case 2:
      res = "Image";
      break;
    case 3:
      res = "Questionnaire + Image";
      break;
    default:
      res = "Invalid Submission Type";
      break;
  }
  return res;
};

export default getSubmissionTypeText;
