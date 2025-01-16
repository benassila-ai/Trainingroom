import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ActionType, getType } from "typesafe-actions";
import {
  loadCoursesAction,
  saveCourseAction,
  removeCourseAction,
} from "./actions";
import { Course } from "./typings";
import { RootState } from "../../store";

/**
 * Namespace for the courses slice in the Redux store.
 */
export const coursesNamespace = "courses";

/**
 * Type definition for the courses state.
 */
type CoursesState = {
  courses: Course[];
  loadingState: null | "pending" | "completed" | "error";
  saveState: null | "pending" | "completed" | "error";
  removeState: null | "pending" | "completed" | "error";
};

/**
 * Initial state for the courses slice.
 */
export const initialState: CoursesState = {
  courses: [],
  loadingState: null,
  saveState: null,
  removeState: null,
};

/**
 * Redux slice for managing courses state.
 */
export const coursesSlice = createSlice({
  name: coursesNamespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle loadCoursesAction
    builder
      .addCase(getType(loadCoursesAction.request), (state) => {
        state.loadingState = "pending";
      })
      .addCase(
        getType(loadCoursesAction.success),
        (state, action: ActionType<typeof loadCoursesAction.success>) => {
          state.loadingState = "completed";
          state.courses = action.payload;
        }
      )
      .addCase(
        getType(loadCoursesAction.failure),
        (state, action: ActionType<typeof loadCoursesAction.failure>) => {
          state.loadingState = "error";
        }
      );
    // Handle saveCourseAction
    builder
      .addCase(getType(saveCourseAction.request), (state) => {
        state.saveState = "pending";
      })
      .addCase(
        getType(saveCourseAction.success),
        (state, action: ActionType<typeof saveCourseAction.success>) => {
          if (action.payload.id) {
            const index = state.courses.findIndex(
              (course) => course.id === action.payload.id
            );
            state.courses[index] = action.payload as Course;
          } else {
            state.courses.push(action.payload);
          }
					state.saveState = "completed";
        }
      )
      .addCase(
        getType(saveCourseAction.failure),
        (state, action: ActionType<typeof saveCourseAction.failure>) => {
          state.saveState = "error";
        }
      );
    // Handle removeCourseAction
    builder
      .addCase(getType(removeCourseAction.request), (state) => {
        state.removeState = "pending";
      })
      .addCase(
        getType(removeCourseAction.success),
        (state, action: ActionType<typeof removeCourseAction.success>) => {
          state.removeState = "completed";
          const index = state.courses.findIndex(
            (course) => course.id === action.payload
          );
          state.courses.splice(index, 1);
        }
      )
      .addCase(getType(removeCourseAction.failure), (state) => {
        state.removeState = "error";
      });
  },
});

/**
 * Selector to get the list of courses from the state.
 */
export const selectCourses = (state: RootState) => state.courses.courses;
/**
 * Selector to get the loading state from the state.
 */
export const selectLoadingState = (state: RootState) =>
  state.courses.loadingState;
/**
 * Selector to get the save state from the state.
 */
export const selectSaveState = (state: RootState) => state.courses.saveState;

/**
 * Selector to get a specific course by its ID.
 * If the course is not found, returns a default course object.
 */
export const selectCourse = createSelector(
  [selectCourses, (state: RootState, id?: number) => id],
  (courses, id) => {
    const course = courses.find((course) => course.id === id);
    if (!course) {
      return {
        title: "",
        description: "",
        level: "",
        duration: 0,
        maxEnrollment: 0,
        price: 0,
        category: "",
      };
    }
    return course;
  }
);

/**
 * Selector to get the title of a specific course by its ID.
 * If the course is not found, returns an empty string.
 */
export const selectCourseTitle = createSelector(
	[selectCourses, (state: RootState, id?: number) => id],
	(courses, id) => {
		const course = courses.find((course) => course.id === id);
		if (!course) {
			return "";
		}
		return course.title;
	}
)

export default coursesSlice.reducer;
