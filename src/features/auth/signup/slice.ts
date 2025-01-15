import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, getType } from 'typesafe-actions';
import { RootState } from '../../../store';
import { ClaimsType } from '../typings';
import { signupAction } from './actions';


const signupNamespace = 'signup';
type signupState = {
  token: string;
  claims: ClaimsType | null;
  signupState: string | null;
};

export const initialState: signupState = {
  token: '',
  claims: null,
  signupState: null,
}

export const signupSlice = createSlice({
  name: signupNamespace,

  initialState,

 /*Non asynchronous actions. Actions that don't return a promise*/
  reducers: {
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action.payload;
    }
  },

  /*Asynchronous actions. Actions that return a promise*/
  extraReducers: (builder) => {
    builder
      .addCase(getType(signupAction.request), (state) => {
        state.signupState = 'pending';
      })
      .addCase(
        getType(signupAction.success),
        (state, action: ActionType<typeof signupAction.success>) => {
          state.signupState = 'completed';
        }
      )
      .addCase(
        getType(signupAction.failure), 
        (state, action: ActionType<typeof signupAction.failure>) => {
        state.signupState =  action.payload;
      });
  },
});

/* export all non-async actions */
export const { saveClaimsAction, saveTokenAction } = signupSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.signup.token;
export const selectClaims = (state: RootState) => state.signup.claims;
export const selectSignupState = (state: RootState) => state.signup.signupState;


export default signupSlice.reducer;