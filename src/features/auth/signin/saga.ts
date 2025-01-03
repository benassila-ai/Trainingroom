import { takeLatest, put, call } from "@redux-saga/core/effects";
import { jwtDecode } from "jwt-decode";
import { signinAction } from "./actions";
import { saveTokenAction, saveClaimsAction } from "./slice";

/**
 * Saga to handle user sign-in.
 *
 * Listens for the `signinAction.request` action, and attempts to authenticate
 * the user using the provided credentials.
 *
 * - Sends a POST request to the login endpoint with the sign-in data.
 * - On success:
 *   - Decodes the JWT access token to extract user claims.
 *   - Dispatches `signinAction.success` action.
 *   - Saves the access token and user claims in the store.
 * - On failure, dispatches `signinAction.failure` action with error details.
 *
 * @param {object} action - The action containing sign-in data.
 * @yields {Generator} Redux Saga effects.
 */
function* signin({
  payload: signinData,
}: ReturnType<typeof signinAction.request>): Generator {
  try {
    let url = "http://localhost:5000/login";

    const response = (yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    })) as Response;

    const data = yield response.json();
    if (response.ok) {
      yield call([localStorage, 'setItem'], 'token', data.accessToken);
      const claims = yield call(jwtDecode, data.accessToken);
      yield put(signinAction.success());
      yield put(saveTokenAction(data.accessToken));
      yield put(saveClaimsAction(claims));
    } 
    else {
      yield put(signinAction.failure(data));
    }
  } catch (error) {
    yield put(signinAction.failure("error"));
  }
}

export default function* signinSaga() {
  yield takeLatest(signinAction.request, signin);
}
