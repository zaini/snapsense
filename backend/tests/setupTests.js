// Util file for setting up the database before each test

const deleteAll = require("./setup/clearDB");
const seedFixtures = require("./setup/seedDB");

global.beforeEach(async () => {
  await deleteAll();
  await seedFixtures();
});

global.beforeAll(async () => {
  await deleteAll();
  await seedFixtures();
});

jest.setTimeout(30000);