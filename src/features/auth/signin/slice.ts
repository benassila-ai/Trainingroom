import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, getType } from 'typesafe-actions';
import { RootState } from '../../../store';
import { ClaimsType } from '../typings';
import { signinAction } from './actions';


const signupNamespace = 'signin';
type signinState = {
  token: string;
  claims: ClaimsType | null;
  signinState: string | null;
};

const initialState: signinState = {
  token: '',
  claims: null,
  signinState: null,
}

export const signinSlice = createSlice({
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
      .addCase(getType(signinAction.request), (state) => {
        state.signinState = 'pending';
      })
      .addCase(
        getType(signinAction.success),
        (state, action: ActionType<typeof signinAction.success>) => {
          state.signinState = 'completed';
        }
      )
      .addCase(
        getType(signinAction.failure), 
        (state, action: ActionType<typeof signinAction.failure>) => {
        state.signinState =  action.payload;
      });
  },
});

/* export all non-async actions */
export const { saveClaimsAction, saveTokenAction } = signinSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.signin.token;
export const selectClaims = (state: RootState) => state.signin.claims;
export const selectSigninState = (state: RootState) => state.signin.signinState;


export default signinSlice.reducer;