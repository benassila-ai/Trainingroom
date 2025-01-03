import saga from 'redux-saga';
import { configureStore, Action, ThunkAction, Tuple} from '@reduxjs/toolkit';
import signupReducer  from '../features/auth/signup/slice';
import signinReducer  from '../features/auth/signin/slice';
import membersReducer  from '../features/members/slice';
import coursesReducer  from '../features/courses/slice';
import rootSaga from './rootSaga';

const sagaMiddleware = saga();

export const store = configureStore({
    reducer: {
      signup: signupReducer,
      signin: signinReducer,
      members: membersReducer,
      courses: coursesReducer,
    },
    devTools: true,
    // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    new Tuple(...getDefaultMiddleware(), sagaMiddleware),
  
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;