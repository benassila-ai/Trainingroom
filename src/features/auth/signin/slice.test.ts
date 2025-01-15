import {
  signinSlice,
  initialState,
  saveTokenAction,
  saveClaimsAction,
  selectToken,
  selectClaims,
  selectSigninState,
} from "./slice";
import { signinAction } from "./actions";
import { getType } from "typesafe-actions";
import { ClaimsType } from '../typings';
import { RootState } from '../../../store';


describe("Signin slice", () => {
  describe("slice initial state", () => {
    it("should return the initial state", () => {
      expect(signinSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("slice synchronous actions", () => {
    it("should handle saveTokenAction", () => {
      const token = "training-token";
      const nextState = signinSlice.reducer(
        initialState,
        saveTokenAction(token)
      );
      expect(nextState.token).toEqual(token);
    });

    it("should handle saveClaimsAction", () => {
      const claims: ClaimsType = { email: "email", iat: 33, exp: 88, sub: 'sub' };
      const nextState = signinSlice.reducer(
        initialState,
        saveClaimsAction(claims)
      );
      expect(nextState.claims).toEqual(claims);
    });
  });

  describe("slice extraReducers", () => {
    it("should handle signinAction.request", () => {
      const nextState = signinSlice.reducer(initialState, {
        type: getType(signinAction.request),
      });
      expect(nextState.signinState).toEqual("pending");
    });

    it("should handle signinAction.success", () => {
      const nextState = signinSlice.reducer(initialState, {
        type: getType(signinAction.success),
      });
      expect(nextState.signinState).toEqual("completed");
    });

    it("should handle signinAction.failure", () => {
      const error = "error-message";
      const nextState = signinSlice.reducer(initialState, {
        type: getType(signinAction.failure),
        payload: error,
      });
      expect(nextState.signinState).toEqual(error);
    });
  });

  describe("signinSlice selectors", () => {
    const state = {
      signin: {
        token: "training-token",
        claims:  { email: "email", iat: 33, exp: 88, sub: 'sub' },
        signinState: "completed",
      },
    } as RootState;

    it("should select the token", () => {
      expect(selectToken(state)).toEqual("training-token");
    });

    it("should select the claims", () => {
      expect(selectClaims(state)).toEqual({ email: "email", iat: 33, exp: 88, sub: 'sub' });
    });

    it("should select the signinState", () => {
      expect(selectSigninState(state)).toEqual("completed");
    });
  });
});
