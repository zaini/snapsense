import React from 'react';
import { screen, cleanup, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ProfilePage from '../pages/My/ProfilePage';
import { Route, MemoryRouter } from "react-router";
import { AuthContext } from '../context/auth';
import { MockedProvider } from "@apollo/client/testing";

const {
    GET_SUBMISSIONS,
} = require("../components/SubmissionsView/SubmissionsComponent");

const submissionMock = [
    {
        request: {
            query: GET_SUBMISSIONS,
        },
        result: {
            data: {
                getSubmissions: [
                    {
                        id: "1", patient_id: "1",
                    },
                ],
            },
        },
    },
]

afterEach(cleanup);

const setup = async () => {
    const patient = {
        id: 1,
        fname: "first",
        lname: "last",
        email: "patient1@gmail.com",
        createdAt: "2021-03-26T17:42:58.000Z",
        createdAt: "2021-03-26T17:42:58.000Z",
        accountType: "PATIENT",
    };

    const toRet = {
        user: patient
    };

    act(() => {
        render(
            <AuthContext.Provider value={toRet}>
                <MockedProvider mocks={submissionMock} addTypename={false}>
                    <MemoryRouter initialEntries={["/my/profile"]}>
                        <Route path="/my/profile">
                            <ProfilePage />
                        </Route>
                    </MemoryRouter>
                </MockedProvider>
            </AuthContext.Provider>
        );
    });
};


// jest.mock('../context/auth', () => {
//     const accType = "PATIENT";
//     return jest.fn(() => {
//         user: "PATIENT"
//     })
// })

it("renders without crashing", () => {
    setup();
    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
});

// test("renders without crashing with ReactDOM", () => {
//     act(() => {
//         ReactDOM.render((
//             <ApolloProvider>
//                 <AuthContext.Provider value={{ user: "PATIENT" }}>
//                     <ProfilePage />
//                 </AuthContext.Provider>
//             </ApolloProvider>
//         ), container);
//     });

//     expect(container.textContent).toBe("Provided Value");
// });

// test('renders without crashing', () => {

//     const email = '@gmail.com';
//     const password = '';

//     const wrapper = shallow(<ProfilePage handleLogin={state => {
//         expect(state.email).to.be.equal(email);
//         expect(state.password).to.be.equal(password);
//     }} />);

//     wrapper.setState({ email: '@gmail.com', password: ''});

//     wrapper.find('button').simulate('click');


//     const renderProfilePage = render(<ProfilePage accountType="" />);
//     expect(renderProfilePage).toBeTruthy();
// })

// test('Profile page has a userInfo', () => {
//     const wrapper = render(<ProfilePage />);
//     const userInfo = wrapper.findByRole('UserInfo');
//     expect(userInfo).toBeTruthy();
// })
