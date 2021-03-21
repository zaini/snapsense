import React from 'react';
import { render } from "@testing-library/react";
import ProfilePage from '../pages/My/ProfilePage';

test('renders without crashing', () => {
    const renderProfilePage = render(<ProfilePage />);
    expect(renderProfilePage).toBeTruthy()
})

test('Profile page has a userInfo', () => {
    const wrapper = render(<ProfilePage />)
    const userInfo = wrapper.findByRole('UserInfo')
    expect(userInfo).toBeTruthy()
})
