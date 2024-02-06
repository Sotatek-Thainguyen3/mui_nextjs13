import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import GlowingButton from "./GlowingButton";
import "./animation.css";

const Animation = () => {
  return (
    <Box p={2}>
      <Stack spacing={3}>
        <Divider>Glowing button</Divider>
        <GlowingButton />
      </Stack>
    </Box>
  );
};

export default Animation;
