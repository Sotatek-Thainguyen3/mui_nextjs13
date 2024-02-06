import ArrowLeftShort from "@/icons/ArrowLeftShort";
import { useTransfer } from "@/state/transfer/selector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

const defaultValue = { price: undefined, name: undefined };
const HomePage = () => {
  const {
    currentStep,
    dataCollectInfo,
    isOnEditMode,
    focusField,
    onBackStep,
    onNextStep,
    onSetDataTransfer,
  } = useTransfer();

  console.log("dataTransfer", dataCollectInfo);
  const defaultValues = dataCollectInfo?.[currentStep]?.value ?? defaultValue;
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = () => {
    const data = getValues();
    onSetDataTransfer(data);
    onNextStep();
  };

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
        <Typography fontWeight="600">Home page</Typography>
      </Box>
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
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                {...register("name", {
                  required: "Field is required",
                })}
                autoFocus={focusField === "name"}
                id="name"
                name="name"
                size="small"
                fullWidth
                placeholder="Enter..."
              />
              {errors.name?.message && (
                <Typography
                  variant="small"
                  color="red"
                  display="flex"
                  justifyContent="flex-end"
                >
                  {errors.name.message.toString()}
                </Typography>
              )}
            </Box>
            <Box mt={1}>
              {/* <FormLabel htmlFor="amount">Amount</FormLabel> */}
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
                {...register("price", {
                  pattern: { value: /^[0-9]+$/, message: "Number is required" },
                  required: "Field is required",
                })}
                autoFocus={focusField === "price"}
                id="price"
                name="price"
                size="small"
                fullWidth
                placeholder="Enter..."
              />
              {errors.price?.message && (
                <Typography
                  variant="small"
                  color="red"
                  display="flex"
                  justifyContent="flex-end"
                >
                  {errors.price.message.toString()}
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
              {isOnEditMode ? "Collect data" : "Transfer"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default HomePage;
