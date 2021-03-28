const { Patient, Submission } = require("../../models/index");

describe("Submission Model Test", () => {
  it("should delete submission if patient is deleted", async (done) => {
    await Patient.destroy({ where: { id: 1 } });
    const submission = await Submission.findByPk(1);
    expect(submission).toBeNull();
    done();
  });
});
