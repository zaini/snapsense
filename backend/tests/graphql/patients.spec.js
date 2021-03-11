const request = require("supertest");

const app = require("../../index");

test("allPatients", async (done) => {
  const response = await request(app).post("/graphql").send({
    query: `
            query {
                getHospitals{
                  id
                  name
                  contact_email
                }
              }
            `,
  });
  const { body } = response;
  expect(body).toMatchObject({
    data: {
      getHospitals: [],
    },
  });
  done();
});
