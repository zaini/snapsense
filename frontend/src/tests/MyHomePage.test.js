import { GET_SUBMISSIONS, GET_REQUEST, DoctorHomePanel } from "../components/HomePage/DoctorHomePanel";
import { GET_REQUEST, PatientHomePanel } from "../components/HomePage/DoctorHomePanel";
import { MockedProvider } from "@apollo/client/testing";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history';

afterEach(cleanup);
const history = createMemoryHistory();

const doctor_component = render(
    <MockedProvider addTypename={false} >
        <Router history={history}>
            <DoctorHomePanel />
        </Router>
    </MockedProvider>
);

const patient_component = render(
    <MockedProvider addTypename={false} >
      <Router history={history}>
        <PatientHomePanel />
      </Router>
    </MockedProvider>
);

describe('My Home Page' , () => {
    it('should render without crashing for doctor', () => {
        expect(doctor_component).toBeTruthy();
        screen.debug();
    });

    it('should render without crashing for patient', () => {
        expect(patient_component).toBeTruthy();
        screen.debug();
    });

    it('should have header', () => {
        expect(screen.getByText("My Home")).toBeInTheDocument();
        screen.debug();
    })
});

describe('Doctor Panel', () => {
    it('should have submission to review', () => {
        //including gql
    });

    it('should have requests to review', () => {
        //including gql
    });

    it('should have button to review patients', () => {
        //fire event
    });

});

describe('Patient Panel', () => {
    it('should have requests to fulfill', () => {
        //including gql
    });

    it('should have button to view requests', () => {
        //fire event
    });

    it('should have button to create new submission', () => {
        //fire event
    });

});