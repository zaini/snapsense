import { render, screen, cleanup } from "@testing-library/react";

import NewSubmissionPage from "../pages/My/NewSubmissionPage";

test("render the page without crashing", () => {
  const renderPage = render(<NewSubmissionPage/>);
  expect(renderPage).toBeTruthy()
 });
 