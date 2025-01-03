import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ClaimsType } from "../../features/auth/typings";

/**
 * A protected route that will redirect to /signin if the user is not
 * logged in. If the user is logged in, it will render the route.
 *
 * It will also dispatch the saveClaimsAction with the decoded token on
 * mount.
 *
 * @param {object} props The props of the Route component.
 * @returns A Route component or a Navigate component if the user is not
 * logged in.
 */
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  // const dispatch = useAppDispatch();

  if (!token) {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  // // dispatch(saveClaimsAction(decodedToken));
   
  if (!isValidToken(token)) {
    return <Navigate to="/signin"  replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// helper
export const isValidToken = (token: string): boolean => {
  const decodedToken: ClaimsType = jwtDecode(token);
  const expiresAt = decodedToken.exp * 1000;
  const dateNow = Date.now();

  return (dateNow <= expiresAt);

}