import { Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1">
        This is a simple home page using React and MUI.
      </Typography>
    </Container>
  );
};

export default Home;
