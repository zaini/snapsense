import React from 'react';

import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { render } from "@testing-library/react";
import ProfilePage from '../pages/My/ProfilePage';
import UserInfo from '../components/UserInfo';
import { AuthContext } from '../context/auth';

import { ApolloProvider } from '@apollo/client';

// let container;
// beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// });


// let accType = "null"

jest.mock('../context/auth', () => {
    const accType = "PATIENT";
    return jest.fn(() => {
        user: "PATIENT"
    })
})

test("renders without crashing", () => {
    // accType = "PATIENT"
    const {getByText} = render(<ProfilePage/>)
    expect(getByText('My Submissions')).toBeTruthy()
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
