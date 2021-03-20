import { render, screen, cleanup } from "@testing-library/react";

import FeedbackPage from "../pages/Home/FeedbackPage";

test("render the page without crashing", () => {
  render(<FeedbackPage />);
});

// ... more tests ...
