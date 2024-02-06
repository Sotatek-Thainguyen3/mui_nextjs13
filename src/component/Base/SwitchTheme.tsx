"use client";

import { ColorModeContext } from "@/layouts/ThemeProviderUI";
import Button from "@mui/material/Button";
import { useContext } from "react";

const SwitchTheme = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  return <Button onClick={() => toggleColorMode()}>{mode}</Button>;
};

export default SwitchTheme;
