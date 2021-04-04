import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react'
import ShowSubmissionPage from '../pages/My/ShowSubmissionPage';

test('renders without crashing', () => {
  const renderShowSubmissionPage = render(<ShowSubmissionPage />);
  expect(renderShowSubmissionPage).toBeTruthy();
})

// test('render submission', async () => {
//     const { getByText } = render(<ShowSubmissionPage />);
//     const button = getByText("Increase");
//     expect(button).toBeTruthy();
// })