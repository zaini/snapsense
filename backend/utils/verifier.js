module.exports = {
  Verifier: (Model) => {
    class verifier {
      // Verify if the instance exists
      static async isVerified(user) {
        const record = await Model.findOne({
          where: {
            email: user.getDataValue("email"),
            password: user.getDataValue("password"),
          },
        });
        return record !== null;
      }
    }
    return verifier;
  },
};
