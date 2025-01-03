import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  CardContent,
  InputAdornment,
  IconButton,
  Box,
  FormHelperText,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { User } from "../../../typings";
import { signupAction } from "./actions";
import validationSchema from "./validationSchema";
import { Card, Typography, TextField, Button, Container, InputLabel } from "./style";
import { selectSignupState } from "./slice";

/**
 * Signup
 *
 * A form for signing up a new user.
 *
 * Props: none
 *
 * State:
 * - `signupState`: The state of the signup operation, one of "idle", "pending", "completed", "failed"
 * - `passwordVisible`: Whether the password is visible or not
 * - `openAlert`: Whether the alert box should be open or not
 *
 * Context:
 * - `t`: The translation function from `react-i18next`
 * - `useAppDispatch`: The dispatch function from `react-redux`
 * - `useAppSelector`: The selector function from `react-redux`
 * - `useNavigate`: The navigate function from `react-router`
 *
 * Effects:
 * - When the signup state changes, and it is not "idle", "pending", or "completed", show an alert box with the error message
 * - When the form is submitted, dispatch the signup action with the form data
 *
 * Event handlers:
 * - `onSubmit`: Called when the form is submitted. Dispatches the signup action with the form data
 * - `toggleVisibility`: Called when the password visibility button is clicked. Toggles the password visibility
 *
 * Children:
 * - A form with a full name, email, and password field
 * - A button to submit the form
 * - An alert box for displaying errors
 * - A dialog box for displaying the result of the signup operation
 */
const Signup: React.FC = () => {
  const initialValues: User = {
    fullname: "",
    email: "",
    password: "",
    role: "student",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const signupState = useAppSelector(selectSignupState);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  };
  const onSubmit = (user: User) => {
    const newUser = {
      ...user,
      courses: []
    }
    dispatch(signupAction.request(newUser));
    setOpenAlert(false);
  };

  useEffect(() => {
    const validSignupStates = ["completed", "pending"];

    if (signupState != null && !validSignupStates.includes(signupState)) {
      setOpenAlert(true);
    }
  }, [signupState]);

  return (
    <>
      <form className="Form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Container maxWidth="sm">
          <Card elevation={20}>
            <CardContent>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {t("signup")}
              </Typography>
              <div>
                <TextField
                  {...register("fullname")}
                  autoFocus
                  label={t("fullName")}
                  error={!!errors.fullname}
                  fullWidth
                  helperText={!errors.fullname ? t("required") : ""}
                  margin="normal"
                  placeholder={t("enterYourFullName")}
                  required
                />
                {errors.fullname && (
                  <Box sx={{ mt: "3" }}>
                    <FormHelperText error>
                      {errors.fullname.message}
                    </FormHelperText>
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
                    <FormHelperText error>
                      {errors.email.message}
                    </FormHelperText>
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
                            {isPasswordVisible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {errors.password && (
                  <Box sx={{ mt: "3" }}>
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  </Box>
                )}
              </div>
              <div>
                <FormControl 
                  fullWidth
                >
                  <InputLabel 
                    htmlFor="role" 
                  >
                    {t("role")}
                  </InputLabel>
                  <Select
                    {...register("role")}
                    label={t("role")}
                    defaultValue="student"
                  >
                    <MenuItem value="student">
                      {t("student")}
                    </MenuItem>
                    <MenuItem value="teacher">
                      {t("teacher")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                {openAlert && (
                  <Alert
                    onClose={() => setOpenAlert(false)}
                    severity="error"
                    variant="outlined"
                    sx={{ width: "50%", margin: "auto" }}
                  >
                    {t(`${signupState}`)}
                  </Alert>
                )}
              </div>
              <Button
                color="success"
                fullWidth
                type="submit"
                variant="contained"
              >
                {t("signup")}
              </Button>
            </CardContent>
            <Box sx={{ marginBottom: "30px", textAlign: "center" }}>
              {t("alreadyHaveAccount")}
              <Link to="/signin">{t("signin")}</Link>
            </Box>
          </Card>
        </Container>
      </form>
      <Dialog open={signupState === "completed"} keepMounted>
        <DialogTitle>{t("newAccount")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("newAccountCreated")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/")} color="secondary">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            color="success"
            variant="contained"
          >
            {t("signin")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default Signup;
