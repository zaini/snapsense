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
});
