"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateUser } from "./helper";
import { apiClient } from "@/lib/apiClient";
const initialState = {
  message: "",
};
const Dashboard = () => {
  const [state, formAction] = useFormState(updateUser, initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
  };

  console.log("state", state);

  return (
    <Box maxWidth="100%" width="50%" m="auto" textAlign="center" mt={4}>
      <Typography>Action server form</Typography>
      <Box
        component="form"
        action={formAction}
        display="flex"
        flexDirection="column"
        mt={2}
      >
        <TextField
          size="small"
          placeholder="Input 1"
          name="name"
          type="text"
          required
          sx={{ mt: 2 }}
        />
        <TextField
          size="small"
          placeholder="Input 2"
          name="email"
          type="text"
          required
          sx={{ mt: 2 }}
        />
        <Button type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
