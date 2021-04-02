const { Image, Submission } = require("../../models/index");

describe("Image Model Test", () => {
  it("should retreive correct url", async (done) => {
    const url =
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg";
    const image = await Image.findByPk(1);
    expect(image.url).toMatch(url);
    done();
  });
  it("should throw an error on null url", async (done) => {
    await expect(
      Image.create({
        url: null,
        submission_id: 1,
      })
    ).rejects.toThrow();
    done();
  });
  it("should throw an error on empty url", async (done) => {
    await expect(
      Image.create({
        url: "",
        submission_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid url", async (done) => {
    await expect(
      Image.create({
        url: "https://www.youtube.com/watch?v=zWh3CShX_do",
        submission_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should delete image if submission is deleted", async (done) => {
    await Submission.destroy({ where: { id: 1 } });
    const image = await Image.findByPk(1);
    expect(image).toBeNull();
    done();
  });
});
