module.exports = {
  Validator: () => {
    class validator {
      static isWithinRange(value, lowerBound, higherBound) {
        return value >= lowerBound && value <= higherBound;
      }
      static isEmpty(value) {
        return String(value) === "";
      }

      static isName(name) {
        /*
            Check if:
            - name does not include special or numeric character
            - name length is between 2 and 35 characters
        */
        const re = /^[a-z]{2,35}$/;
        return re.test(String(name).toLowerCase().trim());
      }

      static isEmail(email, isDoctor = false) {
        /*
            Check if:
                - Model is not Doctor
                - if Doctor, email must end with @nhs.net
                - email does not start with special characters
        */
        const re = !isDoctor
          ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@nhs.net$/;
        return re.test(String(email).trim());
      }

      static isPassword(password) {
        /*
            Check if:
                - password length is between 6 and 20 characters;
                - password contains at least 1 numeric digit;
                - password contains at least 1 uppercase and at least 1 lowercase characters;
        */
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(password);
      }

      static isImage(url) {
        /*
            Check if:
                - the file has the following extensions: jpe, jpeg, png, jpg, webp
                - contains a string of characters before the dot
            
        */
        const re = /[^\s]+(\.(jpe|jpeg|png|jpg|webp|JPE|JPEG|PNG|JPG|WEBP))$/;
        return re.test(url);
      }
    }
    return validator;
  },
};
