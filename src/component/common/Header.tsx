import { Box, Stack, Toolbar, useTheme } from "@mui/material";
import logo from "src/assets/images/moodle-vector-logo.svg";
import Link from "next/link";
import Image from "next/image";
import SwitchTheme from "../Base/SwitchTheme";
import SwitchLocale from "../Base/SwitchLocale";

export function Header() {
  const theme = useTheme();
  return (
    <Box
      position="static"
      sx={{
        bgcolor: theme.color.bg2,
        border: "none",
        p: "0 1rem",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "70px",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Link href="/">
            <Image src={logo} alt="" width={50} height={50} />
          </Link>
          <SwitchTheme />
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SwitchLocale />
          <Box
            sx={{
              padding: "1rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Home
          </Box>
        </Stack>
      </Toolbar>
    </Box>
  );
}
