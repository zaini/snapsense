const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const express = require("express");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");
const { Admin, Doctor, Patient } = require("./models/index");
const { createAccessToken } = require("./graphql/resolvers/utils/authTokens");

const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

const port = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.jid;
  console.log(token);
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload;
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET_KEY);
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, accessToken: "" });
  }

  const accountType = payload.accountType;
  const id = payload.id;
  let user;
  switch (accountType) {
    case "admin":
      user = await Admin.findOne({ where: { id: id } });
      break;
    case "doctor":
      user = await Doctor.findOne({ where: { id: id } });
      break;
    case "patient":
      user = await Patient.findOne({ where: { id: id } });
      break;
    default:
      break;
  }

  console.log(payload, user);

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  // If the access token is valid and the user it represents is valid, then send back a new token
  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

// GraphQL Apollo Connection
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, payload }) => ({ req, res, payload }),
});

apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}/`);
});
