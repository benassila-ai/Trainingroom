import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add, Delete, Edit, Preview } from "@mui/icons-material";
import { selectCourses } from "./slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadCoursesAction, removeCourseAction } from "./actions";
import { TableContainer, Grid2 } from "./style";

const Courses: React.FC = () => {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleView = (id: number): void => {
    navigate(`view/${id}`);
  };

  const handleEdit = (id: number): void => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (id: number): void => {
    dispatch(removeCourseAction.request(id))
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(loadCoursesAction.request());
  }, [dispatch]);

  // Paginate rows
  const paginatedRows = courses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{t("Courses")} </Typography>
        <Fab
          variant="extended"
          color="success"
          component={Link}
          to="/courses/new"
        >
          <Add sx={{ mr: 1 }} />
          {t("add")}
        </Fab>
      </Grid2>
      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("title")}</TableCell>
                <TableCell align="left">{t("description")}</TableCell>
                <TableCell align="left">{t("level")}</TableCell>
                <TableCell align="left">
                  {t("duration")} ({t("weeks")})
                </TableCell>
                <TableCell align="left">
                  {t("price")}
                  {" ($)"}
                </TableCell>
                <TableCell align="center" sx={{width:"150px"}}>{t("actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((course) => (
                <TableRow key={course.id}>
                  <TableCell component="th" scope="row">
                    {course.title}
                  </TableCell>
                  <TableCell align="left">{course.description}</TableCell>
                  <TableCell align="left">{course.level}</TableCell>
                  <TableCell align="left">{course.duration}</TableCell>
                  <TableCell align="left">{course.price}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={t("view")} placement="top" arrow>
                      <IconButton
                        onClick={() => handleView(course.id ?? 0)}
                        color="success"
                      >
                        <Preview />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("edit")} placement="top" arrow>
                      <IconButton
                        onClick={() => handleEdit(course.id ?? 0)}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("delete")} placement="top" arrow>
                      <IconButton
                        onClick={() => handleDelete(course.id ?? 0)}
                        color="success"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {courses.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("rowsPerPage")}
          />
        )}
      </Paper>
    </>
  );
};

export default Courses;
