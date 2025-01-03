import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { Preview } from "@mui/icons-material";
import { useAppDispatch } from "../../store/hooks";
import { loadMembersAction } from "./actions";
import { selectMembers } from "./slice";

/**
 * Members component displays a paginated and filterable table of members.
 * It allows users to filter members by role and paginate through the list.
 *
 * Features:
 * - Fetches members data and updates the Redux store.
 * - Filters members by role using URL search parameters.
 * - Allows pagination through members with customizable rows per page.
 * - Provides edit and view actions for each member.
 *
 * Uses:
 * - `useSelector` to get members data from the Redux store.
 * - `useAppDispatch` to dispatch actions to load members data.
 * - `useTranslation` for internationalization of labels.
 * - `useNavigate` to navigate to member details page.
 */

const Members: React.FC = () => {
  const members = useSelector(selectMembers);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");

  const handleView = (id: number) => {
    navigate(`/members/view/${id}`);
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
    dispatch(loadMembersAction.request());
  }, [dispatch]);

  let filteredMembers = members;

  // Filter by role
  if (role) {
    filteredMembers = members.filter(
      (member) => member.role === role.toString()
    );
  }

  // Paginate rows
  const paginatedRows = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getRoleLabel = (role: string | null) => {
    if (role === "student") return t("students");
    if (role === "teacher") return t("teachers");
    return t("members");
  };

  return (
    <>
      <Typography variant="h6">{getRoleLabel(role)}</Typography>
      <Paper elevation={4}>
        <TableContainer sx={{ minWidth: 650, marginTop: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("fullName")}</TableCell>
                <TableCell align="left">{t("email")}</TableCell>
                <TableCell align="left">{t("role")}</TableCell>
                <TableCell align="center">{t("actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="h6" align="center">
                      {t("noResutls")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell component="th" scope="row">
                      {member.fullname}
                    </TableCell>
                    <TableCell align="left">{member.email}</TableCell>
                    <TableCell align="left">{member.role}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={t("view")} placement="top" arrow>
                        <IconButton
                          onClick={() => handleView(member.id ?? 0)}
                          color="success"
                        >
                          <Preview />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredMembers.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={filteredMembers.length}
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

export default Members;
