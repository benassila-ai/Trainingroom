import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ActionType, getType } from "typesafe-actions";
import { RootState } from "../../store";
import { loadMembersAction, saveMemberAction } from "./actions";
import { Member } from "../../typings";


/**
 * Namespace for the members slice in the Redux store.
 */
export const membersNamespace = "members";

/**
 * Type definition for the members state.
 */
type MembersState = {
  members: Member[];
  loadingState: null | "pending" | "completed" | "error";
  saveState: null | "pending" | "completed" | "error" | string;
};

/**
 * Initial state for the members slice.
 */
export const initialState: MembersState = {
  members: [],
  loadingState: null,
  saveState: null,
};

/**
 * Redux slice for managing members state.
 */
export const membersSlice = createSlice({
  name: membersNamespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle loadMembersActio
    builder
      .addCase(getType(loadMembersAction.request), (state) => {
        state.loadingState = "pending";
      })
      .addCase(
        getType(loadMembersAction.success),
        (state, action: ActionType<typeof loadMembersAction.success>) => {
          state.loadingState = "completed";
          state.members = action.payload;
        }
      )
      .addCase(
        getType(loadMembersAction.failure),
        (state, action: ActionType<typeof loadMembersAction.failure>) => {
          state.loadingState = "error";
        }
      );
    // Handle saveMemberAction
    builder
      .addCase(getType(saveMemberAction.request), (state) => {
        state.saveState = "pending";
      })
      .addCase(
        getType(saveMemberAction.success),
        (state, action: ActionType<typeof saveMemberAction.success>) => {
          if (action.payload.id) {
            const index = state.members.findIndex(
              (member) => member.id === action.payload.id
            );
            state.members[index] = action.payload as Member;
          } 
        }
      )
      .addCase(
        getType(saveMemberAction.failure),
        (state, action: ActionType<typeof saveMemberAction.failure>) => {
          state.saveState = action.payload;
        }
      );
  },
});

/**
 * Selector to get the list of members from the state.
 */
export const selectMembers = (state: RootState) => state.members.members;

/**
 * Selector to get the loading state from the state.
 */
export const selectLoadingState = (state: RootState) =>
  state.members.loadingState;

/**
 * Selector to get the save state from the state.
 */
export const selectSaveState = (state: RootState) => state.members.saveState;

/**
 * Selector to get a specific member by their ID.
 * If the member is not found, returns a default member object.
 */
export const selectMember = createSelector(
  [selectMembers, (state: RootState, id?: number) => id],
  (members, id) => {
    const member = members.find((member) => member.id === id);
    if (!member) {
      return {
        courses: [],
        id: 0,
        fullname: "",
        email: "",
        password: "",
        role: "",
      };
    }
    return member;
  }
);

export default membersSlice.reducer;
