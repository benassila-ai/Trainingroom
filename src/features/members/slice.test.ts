import {
  membersSlice,
  initialState,
  membersNamespace,
  selectMembers,
  selectLoadingState,
  selectSaveState,
  selectMember,
} from "./slice";
import { loadMembersAction, saveMemberAction } from "./actions";
import { getType } from "typesafe-actions";
import { Member } from "../../typings";

describe("Members slice", () => {
  describe("slice initial state", () => {
    it("should return the initial state", () => {
      expect(membersSlice.reducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });
  });

  describe("loadMembersAction", () => {
    it("should handle loadMembersAction.request", () => {
      const action = { type: getType(loadMembersAction.request) };
      const state = membersSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("pending");
    });

    it("should handle loadMembersAction.success", () => {
      const mockMembers: Member[] = [
        {
          id: 1,
          fullname: "Jaouad benassila",
          email: "jaouadb@example.com",
          password: "password",
          role: "teacher",
          courses: [],
        },
      ];
      const action = {
        type: getType(loadMembersAction.success),
        payload: mockMembers,
      };
      const state = membersSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("completed");
      expect(state.members).toEqual(mockMembers);
    });

    it("should handle loadMembersAction.failure", () => {
      const action = { type: getType(loadMembersAction.failure) };
      const state = membersSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("error");
    });
  });

  describe("saveMemberAction", () => {
    it("should handle saveMemberAction.request", () => {
      const action = { type: getType(saveMemberAction.request) };
      const state = membersSlice.reducer(initialState, action);
      expect(state.saveState).toEqual("pending");
    });

    it("should handle saveMemberAction.success with an existing member", () => {
      const existingMember: Member = {
        id: 1,
        fullname: "Jaouad benassila",
        email: "jaouadb@example.com",
        password: "password",
        role: "teacher",
        courses: [],
      };
      const updatedMember: Member = {
        ...existingMember,
        fullname: "Jaouad benassila",
      };
      const initialStateWithMember = {
        ...initialState,
        members: [existingMember],
      };
      const action = {
        type: getType(saveMemberAction.success),
        payload: updatedMember,
      };
      const state = membersSlice.reducer(initialStateWithMember, action);
      expect(state.members).toEqual([updatedMember]);
    });

    it("should handle saveMemberAction.failure", () => {
      const errorMessage = "Failed to save member";
      const action = {
        type: getType(saveMemberAction.failure),
        payload: errorMessage,
      };
      const state = membersSlice.reducer(initialState, action);
      expect(state.saveState).toEqual(errorMessage);
    });
  });

  describe("selectors", () => {
    const state = {
      [membersNamespace]: {
        members: [
          {
						id: 1,
						fullname: "Jaouad benassila",
						email: "jaouadb@example.com",
						password: "password",
						role: "teacher",
						courses: [],
          },
        ],
        loadingState: "completed",
        saveState: null,
      },
    } as any;

    it("should select members", () => {
      expect(selectMembers(state)).toEqual(state[membersNamespace].members);
    });

    it("should select loadingState", () => {
      expect(selectLoadingState(state)).toEqual(
        state[membersNamespace].loadingState
      );
    });

    it("should select saveState", () => {
      expect(selectSaveState(state)).toEqual(state[membersNamespace].saveState);
    });

    it("should select a member by id", () => {
      const selectedMember = selectMember(state, 1);
      expect(selectedMember).toEqual(state[membersNamespace].members[0]);
    });

    it("should return a default member if id is not found", () => {
      const selectedMember = selectMember(state, 999);
      expect(selectedMember).toEqual({
        id: 0,
        fullname: "",
        email: "",
        password: "",
        role: "",
        courses: [],
      });
    });
  });
});
