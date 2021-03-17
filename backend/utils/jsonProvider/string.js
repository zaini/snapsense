const JSONToString = (p) => {
  try {
    const data = JSON.stringify(p);
    return data;
  } catch (e) {
    throw new ApolloError("Invalid User Details for MX Server");
  }
};

module.exports = JSONToString;
