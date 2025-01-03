import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Container, Typography } from "@mui/material";
import { RootState } from "../../store";
import { selectMember } from "./slice";
import MemberDetails from "../../components/memberDetails";

/**
 * A functional component that displays details of a specific member.
 *
 * @returns {JSX.Element} The JSX element representing the member details page.
 */
const View: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const selectedMember = useSelector((state: RootState) =>
    selectMember(state, id ? parseInt(id, 10) : undefined)
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        {t("memberDetails")}
      </Typography>
      <MemberDetails member={selectedMember} />
      <Button
        onClick={() => navigate("/members")}
        variant="outlined"
        sx={{
          float: "right",
          backgroundColor: "#ffffff",
          marginTop: "20px",
          border: "1px solid #5c67a3",
        }}
      >
        {t("back")}
      </Button>
    </Container>
  );
};

export default View;
