"use client";

import { ThemeMode } from "@/constants/enums";
import colorSchemes from "@/utils/colorSchemes";
import { initialTheme } from "@/utils/theme";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode, createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({
  mode: ThemeMode.LIGHT,
  toggleColorMode: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};
const ThemeProviderMUI = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);

  const modeColor = useMemo(() => {
    const modeChange =
      mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    return {
      mode: modeChange,
      toggleColorMode() {
        setMode(modeChange);
      },
    };
  }, [mode]);

  const theme = createTheme({ ...initialTheme, ...colorSchemes[mode] });
  return (
    <ColorModeContext.Provider value={modeColor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderMUI;
