import { takeLatest, put } from "@redux-saga/core/effects";
import { loadMembersAction, saveMemberAction } from "./actions";
import { Member } from "../../typings";

function* loadMembers(): Generator {
  try {
    const response = (yield fetch("http://localhost:5000/users")) as Response;
    if (response.ok) {
      const members = (yield response.json()) as Member[];
      yield put(loadMembersAction.success(members));
    } else {
      yield put(loadMembersAction.failure());
    }
  } catch (error) {
    yield put(loadMembersAction.failure());
  }
}

function* saveMember({
  payload: member,
}: ReturnType<typeof saveMemberAction.request>): Generator {
  try {
    const url = `http://localhost:5000/users/${member.id}`;
    const response = (yield fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    })) as Response;
    const data = yield response.json();
    if (response.ok) {
      yield put(saveMemberAction.success(data));
    } else {
      yield put(saveMemberAction.failure(data));
    }
  } catch (error: any) {
    yield put(saveMemberAction.failure(error));
  }
}

export default function* membersSaga() {
  yield takeLatest(loadMembersAction.request, loadMembers);
  yield takeLatest(saveMemberAction.request, saveMember);
}
