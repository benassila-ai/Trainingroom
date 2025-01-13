import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";

// Mock NavigationBar to throw an error
jest.mock("./features/layouts/navigationBar", () => () => {
  throw new Error("Could not find React-Redux context value");
});

describe("App component", () => {
  it("App, given no Redux Store, throws error", async () => {
		// Mock console.error to suppress error logs in the test output
    jest.spyOn(console, "error").mockImplementation(() => {});

    // Render the App component wrapped in ErrorBoundary
    render(
      <ErrorBoundary
        FallbackComponent={({ error }) => <div>{error.message}</div>}
      >
        <App />
      </ErrorBoundary>
    );

		// Wait for the error message to appear in the document
    const errorMessage = await screen.findByText(
      /could not find react-redux context value/i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
