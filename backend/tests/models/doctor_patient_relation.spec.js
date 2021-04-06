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

  it("should throw an error on invalid patient id", async (done) => {
    await expect(
      Doctor_Patient_Relation.create({
        patient_id: 15,
        doctor_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid doctor id", async (done) => {
    await expect(
      Doctor_Patient_Relation.create({
        patient_id: 1,
        doctor_id: 82,
      })
    ).rejects.toThrow();
    done();
  });

  it("should not insert duplicate doctor patient relationship", async (done) => {
    const doctor = await Doctor.create({
      fname: "Steve",
      lname: "Alex",
      email: "temp@nhs.net",
      password: "Password123",
      hospital_id: 1,
    });

    const patient = await Patient.create({
      fname: "Mia",
      lname: "Alice",
      email: "patient.new@gmail.com",
      password: "Password123",
    });

    const relationCount = await Doctor_Patient_Relation.count();

    await doctor.addPatient(patient);
    await patient.addDoctor(doctor);

    const newRelationCount = await Doctor_Patient_Relation.count();

    expect(relationCount + 1).toBe(newRelationCount);
    done();
  });
});
