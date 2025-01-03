import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ActionType, getType } from "typesafe-actions";
import { RootState } from "../../store";
import {
  loadCoursesAction,
  saveCourseAction,
  removeCourseAction,
} from "./actions";
import { Course } from "./typings";

export const coursesNamespace = "courses";

type CoursesState = {
  courses: Course[];
  loadingState: null | "pending" | "completed" | "error";
  saveState: null | "pending" | "completed" | "error";
  removeState: null | "pending" | "completed" | "error";
};

const initialState: CoursesState = {
  courses: [],
  loadingState: null,
  saveState: null,
  removeState: null,
};

const coursesSlice = createSlice({
  name: coursesNamespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

// Selectors
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectLoadingState = (state: RootState) =>
  state.courses.loadingState;
export const selectSaveState = (state: RootState) => state.courses.saveState;

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
