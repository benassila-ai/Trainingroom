import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainRoutes from "./index";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./../features/auth/signin/slice";
import jwt from "jsonwebtoken";

// Mock lazy-loaded components
jest.mock("./../features/auth/signup", () => () => <div>Signup Page</div>);
jest.mock("./../features/auth/signin", () => () => <div>Signin Page</div>);
jest.mock("./../features/home", () => () => <div>Home Page</div>);
jest.mock("../features/courses/list", () => () => <div>Courses Page</div>);
jest.mock("../features/courses/edit", () => () => <div>Edit Course Page</div>);
jest.mock("../features/courses/view", () => () => <div>View Course Page</div>);
jest.mock("./../features/notFound", () => () => <div>Not Found Page</div>);
jest.mock("./../features/about", () => () => <div>About Page</div>);
jest.mock("../features/members/profile/view", () => () => (
  <div>Profile Page</div>
));
jest.mock("../features/members/list", () => () => (
  <div data-testid="members-page">Members Page</div>
));
jest.mock("../features/members/view", () => () => <div>View Member Page</div>);
jest.mock("../features/members/profile/edit", () => () => (
  <div>Edit Profile Page</div>
));


describe("MainRoutes Component", () => {
  let store: any;

  beforeEach(() => {
    // Mock localStorage with a valid token
    const secretKey = "secure-secret";
    const expirationDate = new Date("2029-12-31T23:59:59Z");
    const expirationTime = Math.floor(expirationDate.getTime() / 1000); // Convert milliseconds to seconds
    const payload = {
      userId: 123,
      exp: expirationTime,
    };
    const token = jwt.sign(payload, secretKey);
    Storage.prototype.getItem = jest.fn(() => token);

    store = configureStore({
      reducer: signinReducer,
      preloadedState: {
        signin: {
          signinState: "completed",
        },
      } as any,
    });
  });

  afterEach(() => {
    // Clear localStorage mock
    jest.clearAllMocks();
  });

  it("renders the Home component for the root route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Home Page")).toBeInTheDocument();
  });

  it("renders the Signin component for the /signin route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/signin"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Signin Page")).toBeInTheDocument();
  });

  it("renders the Signup component for the /signup route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/signup"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Signup Page")).toBeInTheDocument();
  });

  it("renders the About component for the /about route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/about"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("About Page")).toBeInTheDocument();
  });

  it("renders the Members component for the /members route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/members"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Members Page")).toBeInTheDocument();
  });

  it("renders the ViewMember component for the /members/view/:id route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/members/view/123"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("View Member Page")).toBeInTheDocument();
  });

  it("renders the Courses component for the /courses route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/courses"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Courses Page")).toBeInTheDocument();
  });

  it("renders the EditCourse component for the /courses/edit/:id route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/courses/edit/123"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Edit Course Page")).toBeInTheDocument();
  });

  it("renders the ViewCourse component for the /courses/view/:id route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/courses/view/123"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("View Course Page")).toBeInTheDocument();
  });

  it("renders the Profile component for the /profile route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/profile"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Profile Page")).toBeInTheDocument();
  });

  it("renders the EditProfile component for the /profile/edit/:id route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/profile/edit/123"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Edit Profile Page")).toBeInTheDocument();
  });

  it("renders the NotFound component for an unknown route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={["/unknown"]}
        >
          <MainRoutes />
        </MemoryRouter>
      </Provider>
    );
    expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
  });
});
