import { createAsyncAction } from 'typesafe-actions';

export const signupAction = createAsyncAction(
  'signup/pending',
  'signup/fulfilled',
  'signup/rejected'
)<{ fullname: string, password: string, email: string }, void, string >();
