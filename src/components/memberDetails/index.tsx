import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material";
import { Member } from "../../typings";
import { RootState } from "../../store";
import { selectCourseTitle, selectCourses } from "../../features/courses/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadCoursesAction } from "../../features/courses/actions";

type MemberDetailsProps = {
  member: Member;
};

/**
 * Component that displays member details, including their full name, email, role,
 * and courses they are enrolled in or teaching.
 *
 * @param props
 *  - `member`: An object containing member data, including:
 *    - `fullname`: The member's full name.
 *    - `email`: The member's email address.
 *    - `courses`: An array of course IDs the member is enrolled in (if a student) or teaching.
 *    - `role`: The member's role ("student" or "teacher").
 */
const MemberDetails: React.FC<MemberDetailsProps> = (props) => {
  const { member } = props;
  const { fullname, email, courses, role } = member;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const courseList = useAppSelector(selectCourses);

  useEffect(() => {
    if (courseList.length === 0) {
      dispatch(loadCoursesAction.request());
    }
  }, [dispatch, courseList]);

  return (
    <Card sx={{ mt: 3, boxShadow: 5 }}>
      <CardContent>
        <Grid2 container direction="column" spacing={5}>
          <Stack direction="row" spacing={5} alignItems="left">
            <Typography
              variant="h6"
              sx={{
                minWidth: "250px",
                textAlign: "left",
              }}
            >
              {t("fullName")}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {fullname}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="left">
            <Typography
              variant="h6"
              sx={{
                minWidth: "250px",
                textAlign: "left",
              }}
            >
              {t("role")}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {role}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="left">
            <Typography
              variant="h6"
              sx={{
                minWidth: "250px",
                textAlign: "left",
              }}
            >
              {t("email")}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {email}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="left">
            <Typography
              variant="h6"
              sx={{
                minWidth: "250px",
                textAlign: "left",
              }}
            >
              {role === "student" ? t("enrolledCourses") : t("coursesTaught")}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {courses.map((courseId) => (
                <TitleComponent key={courseId} courseId={courseId} />
              ))}
            </Typography>
          </Stack>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default MemberDetails;

type Props = {
  courseId: number;
};

const TitleComponent: React.FC<Props> = (props) => {
  const { courseId } = props;
  const title = useSelector((state: RootState) =>
    selectCourseTitle(state, courseId)
  );
  return <li>{title}</li>;
};
