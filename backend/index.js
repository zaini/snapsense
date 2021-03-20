const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const Bree = require("bree");
const Graceful = require("@ladjs/graceful");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");

const bree = new Bree({
  jobs: [
    {
      name: "email",
      interval: "30m",
    },
    {
      name: "reminder_schedule",
      interval: "1d",
    },
    {
      name: "schedule_requests",
      interval: "1d",
    },
    {
      name: "schedule_reminder_one",
      interval: "1d",
    },
    {
      name: "schedule_reminder_two",
      interval: "1d",
    },
    {
      name: "schedule_reminder_five",
      interval: "1d",
    },
    {
      name: "schedule_reminder_seven",
      interval: "1d",
    },
  ],
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();
// start all jobs (this is the equivalent of reloading a crontab):
bree.start();

const app = express();

// GraphQL Apollo Connection
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// virtual machine

// Allow requests only from the frontend
const corsOptions = {
  // origin: "http://192.168.137.129:3000",
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

apolloServer.applyMiddleware({ app, cors: corsOptions });

module.exports = app;
