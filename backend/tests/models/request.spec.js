const { Patient, Doctor, Submission, Request } = require("../../models/index");

describe("Request Model Test", () => {
  it("should delete request if doctor is deleted", async (done) => {
    await Doctor.destroy({ where: { id: 1 } });
    const request = await Request.findByPk(1);
    expect(request).toBeNull();
    done();
  });

  it("should delete request if patient is deleted", async (done) => {
    await Patient.destroy({ where: { id: 2 } });
    const request = await Request.findByPk(2);
    expect(request).toBeNull();
    done();
  });

  it("should set submission_id to null if submission is deleted", async (done) => {
    await Submission.destroy({ where: { id: 3 } });
    const request = await Request.findByPk(3);
    expect(request.submission_id).toBeNull();
    done();
  });

  it("should return a valid fulfilled date", async (done) => {
    const request = await Request.findByPk(4);
    expect(request.fulfilled).toMatchObject(
      new Date(new Date().getFullYear(), 0, 8)
    );
    done();
  });

  it("should return a valid deadline date", async (done) => {
    const request = await Request.findByPk(4);
    expect(request.deadline).toMatchObject(
      new Date(new Date().getFullYear(), 0, 10)
    );
    done();
  });

  it("should return a valid patient id", async (done) => {
    const request = await Request.findByPk(4);
    expect(request.patient_id.toString()).toMatch("3");
    done();
  });

  it("should return a valid doctor id", async (done) => {
    const request = await Request.findByPk(4);
    expect(request.doctor_id.toString()).toMatch("3");
    done();
  });

  it("should return a valid submission id", async (done) => {
    const request = await Request.findByPk(4);
    expect(request.submission_id.toString()).toMatch("1");
    done();
  });
});
