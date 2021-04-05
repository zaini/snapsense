const request = require("supertest");

const app = require("../../../index");

let doctorOneToken, doctorTwoToken, patientOneToken, patientTwoToken;

describe("submissions resolvers", () => {
  beforeAll(async (done) => {
    const {
      doctorOne,
      doctorTwo,
      patientOne,
      patientTwo,
    } = await require("./util/authTokens");
    doctorOneToken = doctorOne;
    doctorTwoToken = doctorTwo;
    patientOneToken = patientOne;
    patientTwoToken = patientTwo;

    done();
  });
});
