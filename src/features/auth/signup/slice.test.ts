import {
  signupSlice,
  initialState,
  saveTokenAction,
  saveClaimsAction,
  selectToken,
  selectClaims,
  selectSignupState,
} from "./slice";
import { signupAction } from "./actions";
import { getType } from "typesafe-actions";

describe("Signup slice", () => {
  describe("slice initial state", () => {
    it("should return the initial state", () => {
      expect(signupSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("slice synchronous actions", () => {
    it("should handle saveTokenAction", () => {
      const token = "training-token";
      const nextState = signupSlice.reducer(
        initialState,
        saveTokenAction(token)
      );
      expect(nextState.token).toEqual(token);
    });

    it("should handle saveClaimsAction", () => {
      const claims = { userId: "12345", role: "teacher" };
      const nextState = signupSlice.reducer(
        initialState,
        saveClaimsAction(claims)
      );
      expect(nextState.claims).toEqual(claims);
    });
  });

  describe("slice extraReducers", () => {
    it("should handle signupAction.request", () => {
      const nextState = signupSlice.reducer(initialState, {
        type: getType(signupAction.request),
      });
      expect(nextState.signupState).toEqual("pending");
    });

    it("should handle signupAction.success", () => {
      const nextState = signupSlice.reducer(initialState, {
        type: getType(signupAction.success),
      });
      expect(nextState.signupState).toEqual("completed");
    });

    it("should handle signupAction.failure", () => {
      const error = "error-message";
      const nextState = signupSlice.reducer(initialState, {
        type: getType(signupAction.failure),
        payload: error,
      });
      expect(nextState.signupState).toEqual(error);
    });
  });

  describe("signupSlice selectors", () => {
    const state = {
      signup: {
        token: "training-token",
        claims: { userId: "12345", role: "student" },
        signupState: "completed",
      },
    };

    it("should select the token", () => {
      expect(selectToken(state)).toEqual("training-token");
    });

    it("should select the claims", () => {
      expect(selectClaims(state)).toEqual({ userId: "12345", role: "student" });
    });

    it("should select the signupState", () => {
      expect(selectSignupState(state)).toEqual("completed");
    });
  });
});
