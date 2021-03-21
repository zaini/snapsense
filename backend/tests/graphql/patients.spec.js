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
      getHospitals: [
          {
            id: "1",
            name: "London Hospital",
            contact_email: "london.hospital@mail.com",
          },
          {
            id: "2",
            name: "London Hospital 2",
            contact_email: "london.hospital.two@mail.com",
          },
          {
            id: "3",
            name: "London Hospital 3",
            contact_email: "london.hospital.three@mail.com", 
          }
      ],
    },
  });
  done();
});
