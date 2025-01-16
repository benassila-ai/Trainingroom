import {
  coursesSlice,
  initialState,
  coursesNamespace,
  selectCourses,
  selectLoadingState,
  selectSaveState,
  selectCourse,
  selectCourseTitle,
} from "./slice";
import {
  loadCoursesAction,
  saveCourseAction,
  removeCourseAction,
} from "./actions";
import { getType } from "typesafe-actions";
import { Course } from "./typings";

describe("coursesSlice", () => {
  describe("slice initial state", () => {
    it("should return the initial state", () => {
      expect(coursesSlice.reducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });
  });

  describe("loadCoursesAction", () => {
    it("should handle loadCoursesAction.request", () => {
      const action = { type: getType(loadCoursesAction.request) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("pending");
    });

    it("should handle loadCoursesAction.success", () => {
      const mockCourses: Course[] = [
        {
          id: 1,
          title: "React Basics",
          description: "Learn React fundamentals",
          level: "Beginner",
          duration: 10,
          maxEnrollment: 50,
          price: 100,
          category: "Web Development",
        },
      ];
      const action = {
        type: getType(loadCoursesAction.success),
        payload: mockCourses,
      };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("completed");
      expect(state.courses).toEqual(mockCourses);
    });

    it("should handle loadCoursesAction.failure", () => {
      const action = { type: getType(loadCoursesAction.failure) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.loadingState).toEqual("error");
    });
  });

  describe("saveCourseAction", () => {
    it("should handle saveCourseAction.request", () => {
      const action = { type: getType(saveCourseAction.request) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.saveState).toEqual("pending");
    });

    it("should handle saveCourseAction.success with an existing course", () => {
      const existingCourse: Course = {
        id: 1,
        title: "React Basics",
        description: "Learn React fundamentals",
        level: "Beginner",
        duration: 10,
        maxEnrollment: 50,
        price: 100,
        category: "Web Development",
      };
      const updatedCourse: Course = {
        ...existingCourse,
        title: "React Advanced",
      };
      const initialStateWithCourse = {
        ...initialState,
        courses: [existingCourse],
      };
      const action = {
        type: getType(saveCourseAction.success),
        payload: updatedCourse,
      };
      const state = coursesSlice.reducer(initialStateWithCourse, action);
      expect(state.courses).toEqual([updatedCourse]);
      expect(state.saveState).toEqual("completed");
    });

    it("should handle saveCourseAction.success with a new course", () => {
      const newCourse = {
        title: "Node.js Basics",
        description: "Learn Node.js fundamentals",
        level: "Beginner",
        duration: 8,
        maxEnrollment: 30,
        price: 80,
        category: "Backend Development",
      };
      const action = {
        type: getType(saveCourseAction.success),
        payload: newCourse,
      };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.courses).toEqual([newCourse]);
      expect(state.saveState).toEqual("completed");
    });

    it("should handle saveCourseAction.failure", () => {
      const action = { type: getType(saveCourseAction.failure) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.saveState).toEqual("error");
    });
  });

  describe("removeCourseAction", () => {
    it("should handle removeCourseAction.request", () => {
      const action = { type: getType(removeCourseAction.request) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.removeState).toEqual("pending");
    });

    it("should handle removeCourseAction.success", () => {
      const courseToRemove: Course = {
        id: 1,
        title: "React Basics",
        description: "Learn React fundamentals",
        level: "Beginner",
        duration: 10,
        maxEnrollment: 50,
        price: 100,
        category: "Web Development",
      };
      const initialStateWithCourse = {
        ...initialState,
        courses: [courseToRemove],
      };
      const action = {
        type: getType(removeCourseAction.success),
        payload: courseToRemove.id,
      };
      const state = coursesSlice.reducer(initialStateWithCourse, action);
      expect(state.courses).toEqual([]);
      expect(state.removeState).toEqual("completed");
    });

    it("should handle removeCourseAction.failure", () => {
      const action = { type: getType(removeCourseAction.failure) };
      const state = coursesSlice.reducer(initialState, action);
      expect(state.removeState).toEqual("error");
    });
  });

  describe("selectors", () => {
    const state = {
      [coursesNamespace]: {
        courses: [
          {
            id: 1,
            title: "React Basics",
            description: "Learn React fundamentals",
            level: "Beginner",
            duration: 10,
            maxEnrollment: 50,
            price: 100,
            category: "Web Development",
          },
        ],
        loadingState: "completed",
        saveState: null,
        removeState: null,
      },
    } as any;

    it("should select courses", () => {
      expect(selectCourses(state)).toEqual(state[coursesNamespace].courses);
    });

    it("should select loadingState", () => {
      expect(selectLoadingState(state)).toEqual(
        state[coursesNamespace].loadingState
      );
    });

    it("should select saveState", () => {
      expect(selectSaveState(state)).toEqual(state[coursesNamespace].saveState);
    });

    it("should select a course by id", () => {
      const selectedCourse = selectCourse(state, 1);
      expect(selectedCourse).toEqual(state[coursesNamespace].courses[0]);
    });

    it("should return a default course if id is not found", () => {
      const selectedCourse = selectCourse(state, 999);
      expect(selectedCourse).toEqual({
        title: "",
        description: "",
        level: "",
        duration: 0,
        maxEnrollment: 0,
        price: 0,
        category: "",
      });
    });

    it("should select a course title by id", () => {
      const selectedTitle = selectCourseTitle(state, 1);
      expect(selectedTitle).toEqual("React Basics");
    });

    it("should return an empty string if course title is not found", () => {
      const selectedTitle = selectCourseTitle(state, 999);
      expect(selectedTitle).toEqual("");
    });
  });
});
