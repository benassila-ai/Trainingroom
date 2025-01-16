import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionType, getType } from "typesafe-actions";
import { RootState } from "../../../store";
import { ClaimsType } from "../typings";
import { signinAction } from "./actions";

/**
 * Namespace for the signin slice in the Redux store.
 * This is used to identify the slice in the global state.
 */
const signupNamespace = "signin";

/**
 * Type definition for the signin state.
 * This defines the structure of the state managed by this slice.
 */
type signinState = {
  token: string;
  claims: ClaimsType | null;
  signinState: string | null;
};

/**
 * Initial state for the signin slice.
 * This is the default state when the application starts.
 */
export const initialState: signinState = {
  token: "",
  claims: null,
  signinState: null,
};

/**
 * Redux slice for managing signin state.
 * This slice handles actions related to authentication, such as saving tokens, claims, and managing the signin process.
 */
export const signinSlice = createSlice({
  name: signupNamespace,

  initialState,

  /*Non asynchronous actions. Actions that don't return a promise*/
  reducers: {
    /**
     * Action to save the JWT token to the state.
     * @param state - The current state of the slice.
     * @param action - The payload action containing the token as a string.
     */
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    /**
     * Action to save user claims to the state.
     * @param state - The current state of the slice.
     * @param action - The payload action containing the claims as a ClaimsType object.
     */
    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action.payload;
    },
  },

  /**
   * Asynchronous actions (extra reducers).
   * These actions handle asynchronous operations, and return a promise.
   */
  extraReducers: (builder) => {
    builder
      // Handle signinAction.request
      .addCase(getType(signinAction.request), (state) => {
        state.signinState = "pending";
      })
      // Handle signinAction.success
      .addCase(
        getType(signinAction.success),
        (state, action: ActionType<typeof signinAction.success>) => {
          state.signinState = "completed";
        }
      )
      // Handle signinAction.failure
      .addCase(
        getType(signinAction.failure),
        (state, action: ActionType<typeof signinAction.failure>) => {
          state.signinState = action.payload;
        }
      );
  },
});

/**
 * Export all non-async actions for use in components.
 */
export const { saveClaimsAction, saveTokenAction } = signinSlice.actions;

/**
 * Selector to get the JWT token from the state.
 * @param state - The root state of the application.
 * @returns The JWT token stored in the state.
 */
export const selectToken = (state: RootState) => state.signin.token;

/**
 * Selector to get the user claims from the state.
 * @param state - The root state of the application.
 * @returns The user claims stored in the state.
 */
export const selectClaims = (state: RootState) => state.signin.claims;

/**
 * Selector to get the signin state from the state.
 * @param state - The root state of the application.
 * @returns The current signin state (e.g., "pending", "completed", or an error message).
 */
export const selectSigninState = (state: RootState) => state.signin.signinState;

export default signinSlice.reducer;
