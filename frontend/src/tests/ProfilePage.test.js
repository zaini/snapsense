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


it("renders without crashing", () => {
    setup();
    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
});

// it("should load doctor home page without crashing", async () => {
//     setup();
//     expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
//     await waitFor(() => {
//         const submissionReview = screen.getByTestId("doctorHomeTextOne");
//         const requestReview = screen.getByTestId("doctorHomeTextTwo");
//         expect(screen.getByTestId("doctorHomeContainer")).toBeInTheDocument();
//         expect(submissionReview).toBeInTheDocument();
//         expect(requestReview).toBeInTheDocument();
//         within(submissionReview).getByText(/You have 7 submissions to review./i);
//         within(requestReview).getByText(/You have 1 requests to review./i);
//     });
// });
