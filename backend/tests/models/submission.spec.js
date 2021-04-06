const { Patient, Submission } = require("../../models/index");

describe("Submission Model Test", () => {
  it("should delete submission if patient is deleted", async (done) => {
    await Patient.destroy({ where: { id: 1 } });
    const submission = await Submission.findByPk(1);
    expect(submission).toBeNull();
    done();
  });

  it("should throw an error on invalid patient id", async (done) => {
    await expect(
      Submission.create({
        patient_id: 20,
        flag: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should return a valid patient id", async (done) => {
    const submission = await Submission.findByPk(2);
    expect(submission.patient_id.toString()).toMatch("2");
    done();
  });

  it("should return a null submission flag", async (done) => {
    const submission = await Submission.findByPk(3);
    expect(submission.flag).toBeNull();
    done();
  });
});
