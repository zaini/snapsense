const { verify } = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const isAuth = (req, payload) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    console.log("token", token)
    const new_payload = verify(token, ACCESS_TOKEN_SECRET_KEY);
    payload = new_payload;
    console.log(payload);
    return payload;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isAuth;
