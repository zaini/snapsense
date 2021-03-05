var SequelizeMock = require('sequelize-mock');

var dbMock = new SequelizeMock();

var HospitalMock = dbMock.define('hospital', {
    id: 1,
    name: "London Hospital",
    contact_email: "old@outlook.com"
});

var proxyquire = require('proxyquire');

var myModule = proxyquire('../../models', {
    'patient': HospitalMock
});

beforeEach(() => {
    console.log("STARTED")
})

afterEach(() => {
    console.log("FINISHED")
})

describe('#getUserEmail', () => {
    it("should return a user's email in NAME <EMAIL> format", async (done) => {
        const test = await new myModule.Hospital({
            name: "Saudi Hospital",
            contact_email: "abc@gmail.com"
        }).save()
        const hospital = await myModule.Hospital.findByPk(2);
        const mail = await hospital.getDataValue('contact_email')
        expect(mail === 'test@gmail.com');
        done();
    });
});