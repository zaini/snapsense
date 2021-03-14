const stringToJSON = (p) => {
  try {
    const obj = JSON.parse(p);
    return obj;
  } catch (e) {
    throw new ApolloError("Invalid JSON Parse, MX Template Server");
  }
};
module.exports = stringToJSON;
