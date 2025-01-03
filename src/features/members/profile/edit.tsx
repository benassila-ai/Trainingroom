import React, { useEffect, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCourses } from "../../courses/slice";
import { loadCoursesAction } from "../../courses/actions";
import { RootState } from "../../../store";
import { selectMember, selectSaveState } from "../../members/slice";
import { saveMemberAction } from "../actions";
import validationSchema from "./validationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Member } from "../../../typings";

const Edit: React.FC = () => {
  const initialValues = {
    fullname: "",
    email: "",
    courses: [],
    role: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Member>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const { id } = useParams<{ id?: string }>(); 
  const profile = useSelector((state: RootState) =>
    selectMember(state, id ? parseInt(id, 10) : undefined)
  );
  const saveState = useAppSelector(selectSaveState);
  const [openAlert, setOpenAlert] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  };
  

  const onSubmit = (member: Member) => {
    dispatch(saveMemberAction.request(member));
    navigate("/profile");
  };

  const modifiedProfile = useMemo(
    () => ({
      ...profile,
      password: "",
    }),
    [profile]
  );

  useEffect(() => {
    const validSaveMemberStates = ["completed", "pending"];

    if (saveState != null && !validSaveMemberStates.includes(saveState)) {
      setOpenAlert(true);
    }
  }, [saveState]);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCoursesAction.request());
    }
    reset(modifiedProfile);
  }, [courses.length, dispatch, modifiedProfile, reset]);

  if (profile.id === 0) {
    return null;
  }

  return (
    <>
      <form className="Form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {t("editProfile")}
          </Typography>
          <div>
            <TextField
              {...register("fullname")}
              autoFocus
              label={t("fullname")}
              error={!!errors.fullname}
              fullWidth
              helperText={!errors.fullname ? t("required") : ""}
              margin="normal"
              placeholder={t("enterYourTitle")}
              required
            />
            {errors.fullname && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.fullname.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("email")}
              label={t("email")}
              error={!!errors.email}
              fullWidth
              helperText={!errors.email ? t("required") : ""}
              placeholder={t("emailExample")}
              margin="normal"
              required
              type="email"
            />
            {errors.email && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.email.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            <TextField
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              label={t("password")}
              error={!!errors.password}
              fullWidth
              helperText={!errors.password ? t("required") : ""}
              placeholder={"*".repeat(8)}
              margin="normal"
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleVisibility}>
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {errors.password && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.password.message}</FormHelperText>
              </Box>
            )}
          </div>
          <br />
          <div>
            <FormControl fullWidth>
              <InputLabel htmlFor="role">{t("role")}</InputLabel>
              <Select
                {...register("role")}
                label={t("role")}
                defaultValue={profile.role}
              >
                <MenuItem value="student">{t("student")}</MenuItem>
                <MenuItem value="teacher">{t("teacher")}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <br />
          <div>
            <Controller
              name="courses"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={courses}
                  getOptionLabel={(option) => option.title}
                  defaultValue={courses.filter((course) =>
                    profile.courses.includes(course.id)
                  )}
                  value={courses.filter((course) => value.includes(course.id))}
                  onChange={(_, newValue) =>
                    onChange(newValue.map((course) => course.id))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={
                        profile.role === "student"
                          ? t("enrolledCourses")
                          : t("coursesTaught")
                      }
                      placeholder="select your courses"
                      error={!!errors.courses}
                      required
                      helperText={!errors.courses ? t("required") : ""}
                    />
                  )}
                />
              )}
            />
            {errors.courses && (
              <Box sx={{ mt: "3" }}>
                <FormHelperText error>{errors.courses.message}</FormHelperText>
              </Box>
            )}
          </div>
          <div>
            {openAlert && (
              <Alert
                onClose={() => setOpenAlert(false)}
                severity="error"
                variant="outlined"
                sx={{ width: "50%", margin: "auto" }}
              >
                {t(`${saveState}`)}
              </Alert>
            )}
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              color="success"
              type="submit"
              variant="contained"
              sx={{ float: "right" }}
            >
              {t("submit")}
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              variant="outlined"
              sx={{
                float: "right",
                backgroundColor: "#ffffff",
                marginRight: "10px",
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </Container>
      </form>
    </>
  );
};

export default Edit;
