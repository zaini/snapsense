const {
  Hospital,
  Doctor,
  Patient,
  Doctor_Patient_Relation,
} = require("../../models/index");

describe("Doctor Patient Relation Model Test", () => {
  it("should delete relation if hospital is deleted", async (done) => {
    await Hospital.destroy({ where: { id: 2 } });

    const dprFind = await Doctor_Patient_Relation.findByPk(1);
    expect(dprFind).toBeNull();
    done();
  });

  it("should delete relation if doctor is deleted", async (done) => {
    await Doctor.destroy({ where: { id: 2 } });

    const dprFind = await Doctor_Patient_Relation.findByPk(1);
    expect(dprFind).toBeNull();
    done();
  });

  it("should delete relation if patient is deleted", async (done) => {
    await Patient.destroy({ where: { id: 2 } });
    
    const dprFind = await Doctor_Patient_Relation.findByPk(3);
    expect(dprFind).toBeNull();
    done();
  });
});
