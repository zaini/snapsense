const { Question } = require("../../models/index");

describe("Question Model Test", () => {
  it("should save a valid question", async (done) => {
    const question = await new Question({
      text: "Have you felt nausea in the past 3 days?",
    }).save();

    const questionFind = await Question.findByPk(question.id);

    delete questionFind.dataValues.updatedAt;
    delete questionFind.dataValues.createdAt;
    delete question.dataValues.updatedAt;
    delete question.dataValues.createdAt;

    expect(questionFind.dataValues).toMatchObject(question.dataValues);
    done();
  });

  it("should throw an error on null text", async (done) => {
    await expect(
      Question.create({
        text: null,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty text", async (done) => {
    await expect(
      Question.create({
        text: "",
      })
    ).rejects.toThrow();
    done();
  });
});
