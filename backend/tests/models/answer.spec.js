const { Answer, Question, Submission } = require("../../models/index");

describe("Answer Model Test", () => {
  it("should delete answer if question is deleted", async (done) => {
    await Question.destroy({ where: { id: 1 } });
    const answer = await Answer.findByPk(1);
    expect(answer).toBeNull();
    done();
  });

  it("should delete answer if submission is deleted", async (done) => {
    await Submission.destroy({ where: { id: 1 } });
    const answer = await Answer.findByPk(2);
    expect(answer).toBeNull();
    done();
  });

  it("should return a valid extra", async (done) => {
    const answer = await Answer.findByPk(5);
    expect(answer.extra).toMatch("My foot still hurts");
    done();
  });
});
