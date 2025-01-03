import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Fab, Grid2, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../../store";
import MemberDetails from "../../../components/memberDetails";
import { selectMember } from "../slice";

const View: React.FC = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  let claims;
  if (token) {
    claims = jwtDecode(token);
  }
  const { sub: userId } = claims!;

  const profile = useSelector((state: RootState) =>
    selectMember(state, userId ? parseInt(userId, 10) : undefined)
  );

  return (
    <Container maxWidth="md">
      <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
          {t("myProfile")}
        </Typography>
        <Fab
          variant="extended"
          color="success"
          component={Link}
          to={`/profile/edit/${userId}`}
        >
          <Edit sx={{ mr: 1 }} />
          {t("edit")}
        </Fab>
      </Grid2>
      <MemberDetails member={profile} />
    </Container>
  );
};

export default View;
