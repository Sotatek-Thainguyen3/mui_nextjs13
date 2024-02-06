import { useTransfer } from "@/state/transfer/selector";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Wrapper from "./Wrapper";

const defaultValue = {
  amount: undefined,
};
const TransferPage = () => {
  const {
    currentStep,
    dataCollectInfo,
    isOnEditMode,
    focusField,
    onNextStep,
    onSetDataTransfer,
  } = useTransfer();

  console.log("dataTransfer", currentStep, dataCollectInfo?.[currentStep]);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: dataCollectInfo?.[currentStep]?.value ?? defaultValue,
  });

  const onSubmit = () => {
    const data = getValues();
    onSetDataTransfer(data);
    onNextStep();
  };

  return (
    <Wrapper title="Transfer page">
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ paddingTop: "1rem", width: "100%" }}
        >
          <Box>
            <Box>
              {/* <FormLabel htmlFor="amount">Amount</FormLabel> */}
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <TextField
                {...register("amount", {
                  pattern: { value: /^[0-9]+$/, message: "Number is required" },
                })}
                autoFocus={focusField === "amount"}
                id="amount"
                name="amount"
                size="small"
                fullWidth
                placeholder="Enter..."
              />
              {errors.amount?.message && (
                <Typography
                  variant="small"
                  color="red"
                  display="flex"
                  justifyContent="flex-end"
                >
                  {errors.amount.message.toString()}
                </Typography>
              )}
            </Box>
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
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "1rem" }}
            >
              {isOnEditMode ? "Collect data" : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};

export default TransferPage;
