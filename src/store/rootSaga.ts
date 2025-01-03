import { all } from '@redux-saga/core/effects';
import signupSaga from '../features/auth/signup/saga';
import signinSaga from '../features/auth/signin/saga';
import membersSaga from '../features/members/saga';
import coursesSaga from '../features/courses/saga';

export default function* rootSaga() {
  yield all([signinSaga(), 
    signupSaga(), 
    membersSaga(),
    coursesSaga()]);
}
