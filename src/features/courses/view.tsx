import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
import { selectCourse } from "./slice";
import { Course } from "./typings";

const View: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const selectedCourse = useSelector((state: RootState) =>
    selectCourse(state, id ? parseInt(id, 10) : undefined)
  );

  const [course, setCourse] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    level: "",
    duration: 0,
    maxEnrollment: 0,
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse as Course);
    }
  }, [selectedCourse]);

  const {
    title,
    description,
    level,
    duration,
    maxEnrollment,
    price,
    category,
  } = course;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        {t("courseDetails")}
      </Typography>
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
                {t("title")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {title}
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
                {t("description")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {description}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="left">
              <Typography
                variant="h6"
                sx={{ minWidth: "250px", textAlign: "left" }}
              >
                {t("level")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {level}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="left">
              <Typography
                variant="h6"
                sx={{ minWidth: "250px", textAlign: "left" }}
              >
                {t("duration")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {duration}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="left">
              <Typography
                variant="h6"
                sx={{ minWidth: "250px", textAlign: "left" }}
              >
                {t("category")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {category}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="left">
              <Typography
                variant="h6"
                sx={{ minWidth: "250px", textAlign: "left" }}
              >
                {t("price")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {price}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={5} alignItems="left">
              <Typography
                variant="h6"
                sx={{ minWidth: "250px", textAlign: "left" }}
              >
                {t("maxEnrollment")}:
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {maxEnrollment}
              </Typography>
            </Stack>
          </Grid2>
        </CardContent>
      </Card>
      <Button
        onClick={() => navigate("/courses")}
        variant="outlined"
        sx={{
          float: "right",
          backgroundColor: "#ffffff",
          marginTop: "20px",
        }}
      >
        {t("back")}
      </Button>
    </Container>
  );
};

export default View;
