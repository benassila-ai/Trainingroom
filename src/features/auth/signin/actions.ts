import { createAsyncAction } from 'typesafe-actions';

export const signinAction = createAsyncAction(
  'signin/pending',
  'signin/fulfilled',
  'signin/rejected'
)<{ email: string , password: string }, void, string >();
