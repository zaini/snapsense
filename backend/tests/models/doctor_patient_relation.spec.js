const { Hospital, Doctor, Patient, Doctor_Patient_Relation } = require("../../models/index");

describe("Doctor Patient Relation Model Test", () => {
  it("should delete relation if doctor is deleted", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    const doctor = await new Doctor({
      fname: "Ivan",
      lname: "Ivanov",
      email: "ivan.ivanov@nhs.net",
      password: "Abradabra123",
      hospital_id: hospital.id,
    }).save();

    const patient = await new Patient({
      fname: "John",
      lname: "Doe",
      email: "johndoe@gmail.com",
      password: "12345ABCDEfghi!",
    }).save();

    const dpr = await new Doctor_Patient_Relation({
        doctor_id: doctor.id,
        patient_id: patient.id,
    }).save();

    // Delete hospital -> Delete doctor
    await hospital.destroy();

    const dprFind = await Doctor_Patient_Relation.findByPk(dpr.id);
    expect(dprFind).toBeNull();
    done();
  });

  it("should delete relation if patient is deleted", async (done) => {
    const hospital = await new Hospital({
        name: "Test Hospital",
        contact_email: "test_hospital@mail.com",
      }).save();
  
      const doctor = await new Doctor({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
        hospital_id: hospital.id,
      }).save();
  
      const patient = await new Patient({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "12345ABCDEfghi!",
      }).save();
  
      const dpr = await new Doctor_Patient_Relation({
          doctor_id: doctor.id,
          patient_id: patient.id,
      }).save();
      
      await patient.destroy();
      const dprFind = await Doctor_Patient_Relation.findByPk(dpr.id);
      expect(dprFind).toBeNull();
      done();
  });

});
