"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppLoading from "@/component/Base/AppLoading";
import { authValidateSchema } from "@/types/user";
import { useAppReady, useAuth } from "@/state/app/selectors";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpErrorHandler } from "@/lib/handleError";
import Divider from "@mui/material/Divider";
import {
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import { RegisterForm, SigninData } from "@/types/auth-form";
import CloseIcon from "@/icons/CloseIcon";
import { useToggle } from "@/hooks/useToggle";
import WrapperSwitchTheme from "../Base/SwitchTheme";

const Login = () => {
  const { onSignin } = useAuth();
  const { appReady } = useAppReady();
  // const { isDarkMode } = useTheme();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenForm, setIsOpenForm] = useToggle(false);
  const [typeForm, setTypeForm] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SigninData>({
    resolver: zodResolver(authValidateSchema),
  });

  const {
    register: registerForm,
    handleSubmit: handleSubmitRegister,
    getValues: getValuesRegister,
    formState: { errors: errorsRegister },
  } = useForm<RegisterForm>({
    // resolver: zodResolver(authValidateSchema),
  });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = getValues();
      await onSignin(data);
      toast.success("Login successful");
    } catch (error) {
      httpErrorHandler(error);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    // setLoading(true);
    // try {
    //   const data = getValues();
    //   await onSignin(data);
    //   toast.success("Login successful");
    // } catch (error) {
    //   httpErrorHandler(error);
    // }
    // setLoading(false);
  };

  return (
    <>
      {!appReady ? <AppLoading /> : null}
      <>
        <Container
          maxWidth="md"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: "gray",
                  }}
                />
              }
            >
              <Typography variant="h6" sx={{ my: 2 }}>
                MUI
              </Typography>
              <WrapperSwitchTheme />
            </Stack>
            <Divider />
            <Stack direction="row">
              <Box
                sx={{
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                Home
              </Box>
              <Box
                sx={{
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                About
              </Box>
              <Box
                sx={{
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                Contact
              </Box>
              <Box
                sx={{
                  padding: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpenForm(true)}
              >
                Login
              </Box>
            </Stack>
          </Box>
        </Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: isOpenForm ? "scale(1)" : "scale(0)",
            transition: "transform .5s ease, height .2s ease",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "500px",
              height: "500px",
              maxHeight: "100%",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              border: `1px solid #d5d5d5`,
              borderRadius: "12px",
              backdropFilter: "blur(50px)",
              boxShadow: "0 0 30px rgba(0, 0, 0, .5)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: ".5rem",
                display: "flex",
                borderBottomLeftRadius: "inherit",
                background: "gray",
                cursor: "pointer",
              }}
              onClick={() => setIsOpenForm(false)}
            >
              <CloseIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  fill: "white",
                }}
              />
            </Box>
            {/* Form login */}
            <Box
              component="form"
              onSubmit={handleSubmit(handleLogin)}
              sx={{
                position: "absolute",
                left: 0,
                padding: "2rem",
                width: "100%",
                transition: "transform .18s ease",
                ...(typeForm === "LOGIN"
                  ? {
                      transform: "translateX(0)",
                    }
                  : {
                      transition: "none",
                      transform: "translateX(-100%)",
                    }),
              }}
            >
              <Typography variant="h3" mb={4} color="primary">
                Login
              </Typography>
              <Box mb={2}>
                <FormControl fullWidth variant="standard" size="small">
                  <InputLabel>Username</InputLabel>
                  <Input
                    {...register("email")}
                    endAdornment={
                      <InputAdornment position="end">Email</InputAdornment>
                    }
                  />
                </FormControl>
                {errors.email?.message && (
                  <Typography
                    variant="small"
                    color="yellow"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errors.email.message.toString()}
                  </Typography>
                )}
              </Box>
              <Box mb={3}>
                <FormControl fullWidth variant="standard" size="small">
                  <InputLabel>Password</InputLabel>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((prev) => !prev);
                          }}
                          // onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? "Off" : "On"}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                {errors.password?.message && (
                  <Typography
                    variant="small"
                    color="yellow"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errors.password.message.toString()}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "40px",
                }}
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography mt={2}>
                Don&apos;t have an acount?
                <span
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => setTypeForm("REGISTER")}
                >
                  Register
                </span>
              </Typography>
            </Box>
            {/* Form register */}
            <Box
              component="form"
              onSubmit={handleSubmitRegister(handleRegister)}
              sx={{
                position: "absolute",
                left: 0,
                padding: "2rem",
                width: "100%",
                transition: "transform .18s ease",
                ...(typeForm === "REGISTER"
                  ? {
                      transform: "translateX(0)",
                    }
                  : {
                      transition: "none",
                      transform: "translateX(100%)",
                    }),
              }}
            >
              <Typography variant="h3" mb={4} color="primary">
                Register
              </Typography>
              <Box mb={2}>
                <FormControl
                  fullWidth
                  variant="standard"
                  size="small"
                  {...registerForm("username")}
                >
                  <InputLabel>Username</InputLabel>
                  <Input
                    endAdornment={
                      <InputAdornment position="end">User</InputAdornment>
                    }
                  />
                </FormControl>
                {errorsRegister.username?.message && (
                  <Typography
                    variant="small"
                    color="yellow"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errorsRegister.username.message.toString()}
                  </Typography>
                )}
              </Box>
              <Box mb={2}>
                <FormControl
                  fullWidth
                  variant="standard"
                  size="small"
                  {...registerForm("email")}
                >
                  <InputLabel>Email</InputLabel>
                  <Input
                    endAdornment={
                      <InputAdornment position="end">Email</InputAdornment>
                    }
                  />
                </FormControl>
                {errorsRegister.email?.message && (
                  <Typography
                    variant="small"
                    color="yellow"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errorsRegister.email.message.toString()}
                  </Typography>
                )}
              </Box>
              <Box mb={3}>
                <FormControl
                  fullWidth
                  variant="standard"
                  size="small"
                  {...registerForm("password")}
                >
                  <InputLabel>Password</InputLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((prev) => !prev);
                          }}
                          // onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? "Off" : "On"}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                {errorsRegister.password?.message && (
                  <Typography
                    variant="small"
                    color="yellow"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errorsRegister.password.message.toString()}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "40px",
                }}
                type="submit"
                disabled={isLoading}
              >
                Register
              </Button>
              <Typography mt={2}>
                Already have an acount?{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => setTypeForm("LOGIN")}
                >
                  Login
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    </>
  );
};

export default Login;
