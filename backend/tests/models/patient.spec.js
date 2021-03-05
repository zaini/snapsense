const { Patient } = require("../../models/index");

describe("Save a valid patient", () => {
  it("should save a valid patient", async (done) => {
    let patient = await new Patient({
      fname: "John",
      lname: "Do",
      email: "johndo@gmail.com",
      password: "12345ABCDEfghi!",
    }).save();

    patient = await Patient.findOne({
      where: {
        email: "johndo@gmail.com",
      },
    });
    expect(patient.id).toBe(1);
    expect(patient.fname).toBe("John");
    expect(patient.lname).toBe("Do");
    expect(patient.email).toBe("johndo@gmail.com");
    expect(patient.email).not.toBe("12345ABCDEfghi!");
    done();
  });
});
