import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectCourse } from "./slice";
import { NewCourse } from "./typings";
import { useAppDispatch } from "../../store/hooks";
import { saveCourseAction } from "./actions";
import { RootState } from "../../store";

const Edit: React.FC = () => {
  const initialValues: NewCourse = {
    title: "",
    description: "",
    level: "",
    duration: 0,
    maxEnrollment: 0,
    price: 0,
    category: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewCourse>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();  
  const selectedCourse = useSelector((state: RootState) => selectCourse(state, id ? parseInt(id, 10) : undefined));

  const onSubmit = (data: NewCourse) => {
    dispatch(saveCourseAction.request(data));
    navigate("/courses");
  };

  useEffect(() => {
    if (selectedCourse) {
      reset(selectedCourse);
    }
  }, [selectedCourse, reset]);

  return (
    <>
      <form className="Form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {t("editCourse")}
          </Typography>
          <div>
            <TextField
              {...register("title")}
              autoFocus
              label={t("title")}
              error={!!errors.title}
              fullWidth
              helperText={!errors.title ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourTitle")}
              required
            />
            {errors.title && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.title.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("description")}
              label={t("description")}
              fullWidth
              margin="normal"
              placeholder={t("enterDescription")}
              multiline
            />
          </div>
          <div>
            <TextField
              {...register("level")}
              label={t("level")}
              error={!!errors.level}
              fullWidth
              helperText={!errors.level ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourlevel")}
              required
            />
            {errors.level && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.level.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("duration")}
              label={t("duration")}
              error={!!errors.duration}
              fullWidth
              helperText={!errors.duration ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourduration")}
              required
              type="number"
            />
            {errors.duration && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.duration.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("maxEnrollment")}
              label={t("maxEnrollment")}
              error={!!errors.maxEnrollment}
              fullWidth
              helperText={!errors.maxEnrollment ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourmaxEnrollment")}
              required
              type="number"
            />
            {errors.maxEnrollment && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>
                  {errors.maxEnrollment.message}
                </FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("price")}
              label={t("price")}
              error={!!errors.price}
              fullWidth
              helperText={!errors.price ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourprice")}
              required
              type="number"
            />
            {errors.price && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.price.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("category")}
              label={t("category")}
              error={!!errors.category}
              fullWidth
              helperText={!errors.category ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourcategory")}
              required
            />
            {errors.category && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.category.message}</FormHelperText>
              </Box>
            )}
          </div>
          <Button
            color="success"
            type="submit"
            variant="contained"
            sx={{ float: "right" }}
          >
            {t("submit")}
          </Button>
          <Button 
            onClick={() => navigate("/courses")} 
            variant="outlined"
            sx={{ 
              float: "right", 
              backgroundColor: '#ffffff',
              marginRight: '10px',
            }}
          >
            {t("cancel")}
          </Button>
        </Container>
      </form>
    </>
  );
};


export default Edit;
