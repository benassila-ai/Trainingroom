import { LinearProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";

// Lazy-loaded components for code splitting
const Signup = lazy(() => import("./../features/auth/signup"));
const Signin = lazy(() => import("./../features/auth/signin"));
const Home = lazy(() => import("./../features/home"));
const Courses = lazy(() => import("../features/courses/list"));
const EditCourse = lazy(() => import("../features/courses/edit"));
const ViewCourse = lazy(() => import("../features/courses/view"));
const NotFound = lazy(() => import("./../features/notFound"));
const About = lazy(() => import("./../features/about"));
const Profile = lazy(() => import("../features/members/profile/view"));
const Members = lazy(() => import("../features/members/list"));
const ViewMember = lazy(() => import("../features/members/view"));
const EditProfile = lazy(() => import("../features/members/profile/edit"));

/**
 * The `MainRoutes` component defines all the routes for the application.
 * It uses `react-router-dom`'s `Routes` and `Route` components to map URLs to components.
 * Lazy loading is used to improve performance by splitting the code into smaller chunks.
 * A `Suspense` component with a fallback `LinearProgress` is used to show a loading indicator
 * while the lazy-loaded components are being fetched.
 *
 * The routes are divided into two main sections:
 * 1. Public routes: Accessible to all users (e.g., `/signin`, `/signup`, `/about`).
 * 2. Protected routes: Wrapped in a `ProtectedRoute` component to restrict access to authenticated users.
 *
 * @returns {JSX.Element} A JSX element containing all the routes of the application.
 */
const MainRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: "5rem" }} />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="members" element={<Members />} />
          <Route path="members/view/:id" element={<ViewMember />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="courses/view/:id" element={<ViewCourse />} />
          <Route path="courses/new" element={<EditCourse />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:id" element={<EditProfile />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;