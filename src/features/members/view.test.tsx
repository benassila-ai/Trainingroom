import { screen, render, fireEvent } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import View from "./view";

import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "../../features/members/slice";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe("View member component", () => {
  let store: any;
  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: 1 }));
    store = configureStore({
      reducer: membersReducer,
      preloadedState: {
        members: {
          members: [
            {
              id: 1,
              fullname: "Jaouad benassila",
              email: "jaouad.benassila@example.com",
              password: "ghgjhjh4546456",
              role: "teacher",
              courses: [1],
            },
          ], 
        loadingState: null,
        saveState: null,
      },
        courses: {
          courses: [
            {
              id: 1,
              title: "test",
              description: "test",
              level: "beginner",
              duration: 12,
              maxEnrollment: 20,
              price: 200,
              category: "test",
            },
          ],
        },
      } as any,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders member details", () => {
    const member = { id: 1, fullname: "Jaouad benassila" };

    render(
      <Provider store={store}>
        <View />
      </Provider>
    );

    expect(screen.getByText("memberDetails")).toBeInTheDocument();
    expect(screen.getByText(member.fullname)).toBeInTheDocument();
  });

  it("navigates to members page when back button is clicked", () => {
    const mockNavigate = jest.fn();

    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

    render(
      <Provider store={store}>
        <View />
      </Provider>
    );

    fireEvent.click(screen.getByText("back"));

    expect(mockNavigate).toHaveBeenCalledWith("/members");
  });

  it.skip("renders nothing when member is not found", () => {
    (useParams as jest.Mock).mockImplementation(() => ({ id: 2 }));
    render(
      <Provider store={store}>
        <View />
      </Provider>
    );

    expect(screen.getByText("memberDetails")).not.toBeInTheDocument();
  });

  it('calls navigate function when back button is clicked', () => {
    const mockNavigate = jest.fn();

    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

    render(
      <Provider store={store}>
        <View />
      </Provider>
    );

    fireEvent.click(screen.getByText("back"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
