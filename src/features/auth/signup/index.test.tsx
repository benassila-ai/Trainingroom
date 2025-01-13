// @ts-nocheck
import React from "react";
import * as redux from "react-redux";
import * as hookForm from "react-hook-form";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import signupReducer from "./slice";
import Signup from "./index";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock useForm
const useFormMock = jest.spyOn(hookForm, "useForm");
useFormMock.mockReturnValue({
  register: jest.fn(),
  handleSubmit: jest.fn((fn) => fn),
  formState: { errors: {} } as any,
});

describe("Signup component", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: signupReducer,
      preloadedState: {
        signup: {
          signupState: null,
        },
      } as any,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("snapshots", () => {
    it("should match snapshot", () => {
      const { container } = render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("rendering", () => {
    it("renders correctly, given initial render, displays Placeholdercomponent", async () => {
      const mockNavigate = jest.fn();
      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getAllByText("signup")).toHaveLength(2);
      expect(screen.getByText("fullName")).toBeInTheDocument();
      expect(screen.getByText("email")).toBeInTheDocument();
      expect(screen.getByText("password")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /signup/i })).toBeInTheDocument();
    });

    it("handles form submission", async () => {
      const mockNavigate = jest.fn();
      const user = userEvent.setup();

      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );
      const emailField = screen.getByRole("textbox", { name: "email" });
      const passwordField = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /signup/i });
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      user.type(passwordField, "testPassword");
      // Add a small delay to allow the input field to update
      await waitFor(() => expect(passwordField).toHaveValue("testPassword"));
      await waitFor(() => expect(emailField).toHaveValue("test@example.com"));

      expect(submitButton).toBeInTheDocument();
    });

		it("toggles password visibility", async () => {
      const mockNavigate = jest.fn();
      const user = userEvent.setup();

      (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
			render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );
      const passwordField = screen.getByLabelText(/password/i);
      user.type(passwordField, "testPassword");
      expect(passwordField).toHaveAttribute("type", "password");

      const toggleButton = screen.getByRole("button", { name: "" });
      fireEvent.click(toggleButton);
      expect(passwordField).toHaveAttribute("type", "text");
    });

		it("shows validation errors on submit", async () => {
			const user = userEvent.setup();
      useFormMock.mockReturnValue({
        register: jest.fn(),
        handleSubmit: jest.fn((fn) => fn),
        formState: {
          errors: { email: { message: "password is a required field" } },
        } as any,
      });

			render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );

      const passwordField = screen.getByLabelText(/password/i);
			user.type(passwordField, "testPassword");

      const submitButton = screen.getByRole("button", { name: /signup/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("password is a required field")
        ).toBeInTheDocument();
      });
    });

		it("displays alert based on signinState", () => {
      redux.useSelector.mockReturnValue("failed");

			render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Provider store={store}>
            <Signup />
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getByText("failed")).toBeInTheDocument();
    });
  });
});
