import { takeLatest, put, call } from "@redux-saga/core/effects";
import { jwtDecode } from "jwt-decode";
import { signupAction } from "./actions";
import { saveTokenAction, saveClaimsAction } from "./slice";
import { ClaimsType } from "../typings";

function* signup({
  payload: signupData,
}: ReturnType<typeof signupAction.request>): Generator {
  try {
    let url = "http://localhost:5000/register";

    const response = (yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })) as Response;

    const data = yield response.json();
    if (response.ok) {
      const claims: ClaimsType = yield call(jwtDecode, data.accessToken);

      yield put(signupAction.success());
      yield call([localStorage, 'setItem'], 'token', data.accessToken);
      yield put(saveTokenAction(data.accessToken));
      yield put(saveClaimsAction(claims));

    } else {
      yield put(signupAction.failure(data));
    }
  } catch (error) {
    yield put(signupAction.failure("error"));
  }
}

export default function* signupSaga() {
  yield takeLatest(signupAction.request, signup);
}
