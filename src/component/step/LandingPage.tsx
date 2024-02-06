import { useTransfer } from "@/state/transfer/selector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LandingPage = () => {
  const { onNextStep } = useTransfer();
  return (
    <Box>
      <Box>
        <Typography fontWeight="600">Landing page</Typography>
      </Box>
      <Box
        sx={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        content
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: ".5rem",
        }}
      >
        <Button variant="contained" onClick={() => onNextStep()}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
