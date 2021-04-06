import {
  CREATE_HOSPITAL,
  GET_HOSPITALS,
} from "../../components/Hospital/NewHospitalForm";

const mocks = [
  {
    request: {
      query: CREATE_HOSPITAL,
      variables: { name: "Hospital", contact_email: "hospital@gmail.com" },
    },
    result: { data: { createHospital: true } },
  },
  {
    request: {
      query: GET_HOSPITALS,
      variables: {},
    },
    result: {
      data: {
        getHospitals: [
          {
            id: "1",
            name: "Hospital One",
            contact_email: "hospital.one@hospitals.uk",
          },
          {
            id: "2",
            name: "Hospital Two",
            contact_email: "hospital.two@hospitals.uk",
          },
        ],
      },
    },
  },
];

export default mocks;
