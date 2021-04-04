import React from 'react';
import { screen, cleanup, waitFor, render, fireEvent, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ProfilePage from '../pages/My/ProfilePage';
import { Route, MemoryRouter } from "react-router";
import { AuthContext } from '../context/auth';
import { MockedProvider } from "@apollo/client/testing";

const {
    GET_SUBMISSIONS,
} = require("../components/SubmissionsView/SubmissionsComponent");
const {
    CHANGE_PASSWORD,
} = require("../components/utils/ChangePasswordModal");
const {
    DELETE_ACCOUNT,
} = require("../components/utils/DeleteAccountModal");

const Mock = [
    {
        request: {
            query: GET_SUBMISSIONS,
            variables: {
                patient_id: "1",
            },
        },
        result: {
            data: {
                getSubmissions: [
                    {
                        id: "1", flag: "High Risk", createdAt: "1234567890", Patient: {
                            id: "1", fname: "first", lname: "last", email: "patient1@gmail.com", password: "Password123", flag: "asdfghjk"
                        }, Images: {
                            id: "1", url: "asdfghjk"
                        }, Answers: {
                            id: "1",
                            Question: {
                                id: "1",
                                text: "asdfghj"
                            }
                        }, value: "1",
                        extra: "sdfghj",
                    },
                ],
            },
        },
    },
    {
        request: {
            query: CHANGE_PASSWORD,
            variables: {
                password: "Password000",
                password_confirmation: "Password000"
            },
        },
        result: { data: { changePassword: true } },
    },
    {
        request: {
            query: DELETE_ACCOUNT,
            variables: {
                password: "Password123",
                password_confirmation: "Password123"
            },
        },
        result: { data: { deleteAccount: true } },
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
                <MockedProvider mocks={Mock} addTypename={false}>
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

it("renders without crashing for PATIENT", () => {
    setup();
    expect(screen.getByText(/My Submissions/i)).toBeInTheDocument();
});

it("should load UserInfo in profile page without crashing", async () => {
    setup();
    await waitFor(() => {
        const changePWModalButton = screen.getByTestId("changePasswordButton");
        const deleteAccountModalButton = screen.getByTestId("deleteAccountButton");
        expect(changePWModalButton).toBeInTheDocument();
        expect(deleteAccountModalButton).toBeInTheDocument();
    });
});

it("should show loading spinner in profile page for PATIENT without crashing", async () => {
    setup();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

it("should be able to open change password form", async () => {
    setup();
    act(() => {
        fireEvent(
            screen.getByTestId("changePasswordButton"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
    });

    expect(screen.getByTestId("changePasswordModal")).toBeInTheDocument();
});

it("should be able to open delete account modal", async () => {
    setup();
    act(() => {
        fireEvent(
            screen.getByTestId("deleteAccountButton"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
    });

    expect(screen.getByTestId("deleteAccountModal")).toBeInTheDocument();
});

it("should be able to submit change password form", async () => {
    setup();
    act(() => {
        fireEvent(
            screen.getByTestId("changePasswordButton"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
    });

    const form = screen.getByTestId("changePasswordModal");
    const btnSubmit = within(form).getByText(/Change Password/i);

    jest.spyOn(window, "alert").mockImplementation(() => { });
    act(() => {
        fireEvent.click(btnSubmit);
    });

    expect(window.alert).toBeCalledWith(
        "Password has been updated!"
    );
});

it("should be able to delete account", async () => {
    setup();
    act(() => {
        fireEvent(
            screen.getByTestId("deleteAccountButton"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
    });

    const form = screen.getByTestId("deleteAccountModal");
    const buttonDelete = within(form).getByTestId("formDeleteAccount");

    act(() => {
        fireEvent.click(buttonDelete);
    });

    expect(screen.getByText(/Choose Account Type/i));

});