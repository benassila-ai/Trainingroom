import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  CardContent,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Card, Typography, TextField, Button, Container } from "./style";
import validationSchema from "./validationSchema";
import { signinAction } from "./actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { LoginUser } from "../../../typings";
import { selectSigninState } from "./slice";
import { useNavigate } from "react-router-dom";

/**
 * Signin
 *
 * A form for signing in a new user.
 *
 * Props: none
 *
 * State:
 * - `signinState`: The state of the signin operation, one of "idle", "pending", "completed", "failed"
 * - `passwordVisible`: Whether the password is visible or not
 * - `openAlert`: Whether the alert box should be open or not
 *
 * Context:
 * - `t`: The translation function from `react-i18next`
 * - `useAppDispatch`: The dispatch function from `react-redux`
 * - `useAppSelector`: The selector function from `react-redux`
 * - `useTranslation`: The translation function from `react-i18next`
 *
 * Effects:
 * - When the signin state changes, and it is not "idle", "pending", or "completed", show an alert box with the error message
 * - When the form is submitted, dispatch the signin action with the form data
 *
 * Event handlers:
 * - `onSubmit`: Called when the form is submitted. Dispatches the signin action with the form data
 * - `toggleVisibility`: Called when the password visibility button is clicked. Toggles the password visibility
 *
 * Children:
 * - A form with a full name, email, and password field
 * - A button to submit the form
 * - An alert box for displaying errors
 */
const Signin: React.FC = () => {
  const initialValues: LoginUser = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const signinState = useAppSelector(selectSigninState);
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    setOpenAlert(false);
  };

  const onSubmit = (loginUser: LoginUser) => {
    dispatch(signinAction.request(loginUser));
    setOpenAlert(false);
    setTimeout(() => navigate("/members"), 500);
  };

  useEffect(() => {
    const validSigninStates = ["completed", "pending"];

    if (signinState != null && !validSigninStates.includes(signinState)) {
      setOpenAlert(true);
    }
  }, [signinState]);

  return (
    <>
      <form className="Form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Container maxWidth="sm">
          <Card elevation={20}>
            <CardContent>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {t("signin")}
              </Typography>
              <div>
                <TextField
                  autoFocus
                  label={t("email")}
                  error={!!errors.email}
                  fullWidth
                  helperText={!errors.email ? t("required") : ""}
                  type="email"
                  variant="outlined"
                  {...register("email")}
                  required
                  data-testid="email"
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
                  label={t("password")}
                  fullWidth
                  helperText={!errors.password ? t("required") : ""}
                  {...register("password")}
                  error={!!errors.password}
                  required
                  type={isPasswordVisible ? "text" : "password"}
                  variant="outlined"
                  data-testid="password"
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
              </div>
              <div>
                {openAlert && (
                  <Alert
                    onClose={() => setOpenAlert(false)}
                    severity="error"
                    variant="outlined"
                    sx={{ width: "50%", margin: "auto" }}
                  >
                    {t(`${signinState}`)}
                  </Alert>
                )}
              </div>
              <Button
                color="success"
                fullWidth
                type="submit"
                variant="contained"
              >
                {t("signin")}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </form>
    </>
  );
};

export default Signin;
