import { takeLatest, put } from '@redux-saga/core/effects';
import { loadCoursesAction, removeCourseAction, saveCourseAction } from './actions';
import { Course } from './typings';

function* loadCourses(): Generator {
    try {
        const response = (yield fetch('http://localhost:5000/courses')) as Response;
        if (response.ok) {
            const courses = (yield response.json()) as Course[];
            yield put(loadCoursesAction.success(courses));
        } else {
            yield put(loadCoursesAction.failure());
        }
    } catch (error) {
        yield put(loadCoursesAction.failure());
    }
}

function* saveCourse({ payload: course }: ReturnType<typeof saveCourseAction.request>): Generator {
    try {
        let url = "http://localhost:5000/courses";
        let method = "POST";
        if ('id' in course) {
            url += `/${course.id}`;
            method = "PUT";
        }
        const response = (yield fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })) as Response;
        const data = yield response.json();
        if (response.ok) {
            yield put(saveCourseAction.success(data));
        } else {
            yield put(saveCourseAction.failure(data));
        }
    } catch (error) {
        yield put(saveCourseAction.failure());
    }
}

function* removeCourse({
    payload: id,
  }: ReturnType<typeof removeCourseAction.request>): Generator {
    try {
      const response = (yield fetch(`http://localhost:5000/courses/${id}`, {
        method: 'DELETE',
      })) as Response;
      if (response.ok) {
        yield put(removeCourseAction.success(id));
      } else {
        yield put(removeCourseAction.failure());
      }
    } catch (e) {
      yield put(removeCourseAction.failure());
    }
  }

export default function * coursesSaga() {
    yield takeLatest(loadCoursesAction.request, loadCourses);
    yield takeLatest(saveCourseAction.request, saveCourse);
    yield takeLatest(removeCourseAction.request, removeCourse);
}