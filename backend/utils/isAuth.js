const { AuthenticationError, ApolloError } = require("apollo-server");
const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const isAuth = (context) => {
  // Context = { ...headers }
  console.log(ACCESS_TOKEN_SECRET_KEY)
  const authHeader = context.req.headers.authorization;
  const needle = "Bearer ";
  if (authHeader) {
    const token = authHeader.split(needle)[1];
    if (token) {
      try {
        const verifiedToken = verify(token, ACCESS_TOKEN_SECRET_KEY);
        return verifiedToken;
      } catch (error) {
        throw new AuthenticationError("Invalid Login Token");
      }
    }
    throw new ApolloError("Missing Authorization Token", "400");
  }
  throw new ApolloError("Missing Authorization Header", "400");
};

module.exports = isAuth;
