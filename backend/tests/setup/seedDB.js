// Util file to seed the database with the fixtures, ran before each test

const hospitals = require("../fixtures/hospitals");
const superAdmins = require("../fixtures/super_admins");
const admins = require("../fixtures/admins");
const doctors = require("../fixtures/doctors");
const patients = require("../fixtures/patients");
const questions = require("../fixtures/questions");
const submissions = require("../fixtures/submissions");
const images = require("../fixtures/images");
const answers = require("../fixtures/answers");
const doctorPatientRelation = require("../fixtures/doctor_patient_relations");
const requests = require("../fixtures/requests");
const feedback = require("../fixtures/feedback");

const seedFixtures = async () => {
  await hospitals();
  await superAdmins();
  await admins();
  await doctors();
  await patients();
  await questions();
  await submissions();
  await images();
  await answers();
  await doctorPatientRelation();
  await requests();
  await feedback();
};

module.exports = seedFixtures;
