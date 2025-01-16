import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionType, getType } from "typesafe-actions";
import { RootState } from "../../../store";
import { ClaimsType } from "../typings";
import { signupAction } from "./actions";

/**
 * Namespace for the signup slice in the Redux store.
 * This is used to identify the slice in the global state.
 */
const signupNamespace = "signup";

/**
 * Type definition for the signup state.
 * This defines the structure of the state managed by this slice.
 */
type signupState = {
  token: string;
  claims: ClaimsType | null;
  signupState: string | null;
};

/**
 * Initial state for the signup slice.
 * This is the default state when the application starts.
 */
export const initialState: signupState = {
  token: "",
  claims: null,
  signupState: null,
};

/**
 * Redux slice for managing signup state.
 * This slice handles actions related to user registration, such as saving tokens, claims, and managing the signup process.
 */
export const signupSlice = createSlice({
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
   * These actions handle asynchronous operations and return a promise.
   */
  extraReducers: (builder) => {
    builder
      // Handle signupAction.request
      .addCase(getType(signupAction.request), (state) => {
        state.signupState = "pending";
      })
      // Handle signupAction.success
      .addCase(
        getType(signupAction.success),
        (state, action: ActionType<typeof signupAction.success>) => {
          state.signupState = "completed";
        }
      )
      // Handle signupAction.failure
      .addCase(
        getType(signupAction.failure),
        (state, action: ActionType<typeof signupAction.failure>) => {
          state.signupState = action.payload;
        }
      );
  },
});

/* export all non-async actions for use in components */
export const { saveClaimsAction, saveTokenAction } = signupSlice.actions;

/**
 * Selector to get the JWT token from the state.
 * @param state - The root state of the application.
 * @returns The JWT token stored in the state.
 */
export const selectToken = (state: RootState) => state.signup.token;

/**
 * Selector to get the user claims from the state.
 * @param state - The root state of the application.
 * @returns The user claims stored in the state.
 */
export const selectClaims = (state: RootState) => state.signup.claims;

/**
 * Selector to get the signup state from the state.
 * @param state - The root state of the application.
 * @returns The current signup state (e.g., "pending", "completed", or an error message).
 */
export const selectSignupState = (state: RootState) => state.signup.signupState;

export default signupSlice.reducer;