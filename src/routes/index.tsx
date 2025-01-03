import { LinearProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";

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
 * This component contains all the routes of the application.
 * It uses the BrowserRouter component from react-router-dom to
 * enable client-side routing.
 *
 * The different routes are:
 * - / : render the Home component
 * - /signin : render the Signin component
 * - /signup : render the Signup component
 * - /students : render the Students component
 * - /courses : render the Courses component
 *
 * @returns A JSX element containing all the routes of the application.
 */
const MainRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: "5rem" }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
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
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
