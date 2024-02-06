import Box from "@mui/material/Box";
import LandingPage from "./LandingPage";
import { STEP, tabs } from "@/constants";
import HomePage from "./HomePage";
import { useTransfer } from "@/state/transfer/selector";
import TransferPage from "./TransferPage";
import CollectInfo from "./CollectInfo";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import { default as StepMui } from "@mui/material/Step";

const Step = () => {
  const { currentStep, previousStep } = useTransfer();

  console.log("step", currentStep, previousStep);

  const dynamicStep = (step: STEP) => {
    switch (step) {
      case STEP.HOME:
        return <HomePage />;
      case STEP.TRANSFER:
        return <TransferPage />;
      case STEP.COLLECT_INFO:
        return <CollectInfo />;
      default:
        return <LandingPage />;
    }
  };
  return (
    <Box p={2}>
      {dynamicStep(currentStep)}
      <Box>
        Tab selected: {tabs.find((i) => i.value === currentStep)?.label}
      </Box>
      {/* <Box>
        <Stepper nonLinear activeStep={currentStep}>
          {tabs.map((label, index) => (
            <StepMui key={index} completed={label.value < currentStep}>
              <StepButton color="inherit">{label.label}</StepButton>
            </StepMui>
          ))}
        </Stepper>
      </Box> */}
    </Box>
  );
};

export default Step;
