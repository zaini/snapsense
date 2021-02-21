const { Doctor } = require("../models/index");

module.exports = {
  Validator: (Model) => {
    class validator {
      // TODO: Privatize validateName, validateEmail and validatePassword

      static validateName(name) {
        /*
            Check if:
            - name starts with capital letter
            - name does not include special or numeric character
            - name length does not exceed 35 characters
        */
        const re = /^[A-Z][a-z]{1,35}$/;
        return re.test(name);
      }

      static validateEmail(email) {
        /*
            Check if:
                - Model is not Doctor
                - if Doctor, email must end with @nhs.co.uk
                - email does not start with special characters
        */
        const re =
          Model !== Doctor
            ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@nhs.co.uk$/;
        return re.test(email);
      }

      static validatePassword(password) {
        const minimumLenght = 6;
        if (password.length < minimumLenght) {
          return false;
        }
        /*
            Check if:
                - password length does not exceed 20 characters;
                - password contains 1 numeric digit;
                - password contains 1 uppercase and 1 lowercase characters;
        */
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(password);
      }

      // Verify if user information is valid
      static isValid(user) {
        return (
          validator.validateEmail(user.getDataValue("email")) &&
          validator.validateName(user.getDataValue("fname")) &&
          validator.validateName(user.getDataValue("lname")) &&
          validator.validatePassword(user.getDataValue("password"))
        );
      }
    }
    return validator;
  },
};
