import { STEP } from "@/constants";
import ArrowLeftShort from "@/icons/ArrowLeftShort";
import { useTransfer } from "@/state/transfer/selector";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

interface WrapperProps {
  onStep?: (step: STEP) => void;
  title: string;
}
const Wrapper = ({
  title,
  children,
  onStep,
}: PropsWithChildren<WrapperProps>) => {
  const { onBackStep } = useTransfer();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <ArrowLeftShort
          onClick={() => onBackStep()}
          sx={{ cursor: "pointer" }}
        />
        <Typography fontWeight="600">{title}</Typography>
      </Box>
      {children}
    </Box>
  );
};

export default Wrapper;
