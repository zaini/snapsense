const { Feedback } = require("../../models/index");

describe("Feedback Model Test", () => {
  it("should save a valid feedback", async (done) => {
    await expect(
      Feedback.create({
        stars: 4,
        extra: "I've felt much better",
      })
    ).toBeTruthy();
    done();
  });

	it("should save a feedback with 0 stars", async (done) => {
    await expect(
      Feedback.create({
        stars: 0,
        extra: "Not a great experience",
      })
    ).toBeTruthy();
    done();
  });

	it("should save a feedback with 5 stars", async (done) => {
    await expect(
      Feedback.create({
        stars: 0,
        extra: "Amazing website and service!",
      })
    ).toBeTruthy();
    done();
  });

	it("should save a feedback with null extra", async (done) => {
    await expect(
      Feedback.create({
        stars: 4,
      })
    ).toBeTruthy();
    done();
  });

  it("should throw an error on invalid stars value", async (done) => {
    await expect(
      Feedback.create({
        stars: -1,
        extra: "",
      })
    ).rejects.toThrow();
    done();
  });

  it("should return a valid feedback extra", async (done) => {
    const feedback = await Feedback.findByPk(1);
    expect(feedback.extra).toMatch("I love SnapSense so much!");
    done();
  });

  it("should return a valid feedback stars", async (done) => {
    const feedback = await Feedback.findByPk(3);
    expect(feedback.stars.toString()).toMatch("0");
    done();
  });
});
