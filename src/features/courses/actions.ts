import { createAsyncAction } from 'typesafe-actions';
import { Course, NewCourse } from './typings';

export const loadCoursesAction = createAsyncAction(
    'courses/load/pending',
    'courses/load/fulfilled',
    'courses/load/rejected'
)<void, Course[], void >();

export const saveCourseAction = createAsyncAction(
    'course/save/pending',
    'course/save/fulfilled',
    'course/save/rejected'
)<NewCourse, Course, void>();

export const removeCourseAction = createAsyncAction(
    'course/remove/pending',
    'course/remove/fulfilled',
    'course/remove/rejected'
)<number, number, void>();