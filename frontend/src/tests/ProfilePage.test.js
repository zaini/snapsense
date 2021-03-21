import React from 'react';
import { render } from "@testing-library/react";
import ProfilePage from '../pages/My/ProfilePage';

test('renders without crashing', () => {

    // const email = '@gmail.com';
    // const password = '';

    // const wrapper = shallow(<ProfilePage handleLogin={state => {
    //     expect(state.email).to.be.equal(email);
    //     expect(state.password).to.be.equal(password);
    // }} />);

    // wrapper.setState({ email: '@gmail.com', password: ''});

    // wrapper.find('button').simulate('click');

    const renderProfilePage = render(<ProfilePage />);
    expect(renderProfilePage).toBeTruthy();
})

test('Profile page has a userInfo', () => {
    const wrapper = render(<ProfilePage />);
    const userInfo = wrapper.findByRole('UserInfo');
    expect(userInfo).toBeTruthy();
})
