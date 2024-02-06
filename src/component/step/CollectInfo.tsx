import { useTransfer } from "@/state/transfer/selector";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Wrapper from "./Wrapper";
import { STEP } from "@/constants";
import Link from "@mui/material/Link";

const CollectInfo = () => {
  const { allCollectInfo, onChangeStep } = useTransfer();

  console.log("allCollectInfo", allCollectInfo);

  const { amount, name, price } = allCollectInfo as {
    price: string;
    name: string;
    amount: string;
  };
  return (
    <Wrapper title="Collect infomation">
      <Box pt={2}>
        <FieldLabel
          label="Amount"
          valueField={amount}
          onClick={() => onChangeStep(STEP.TRANSFER, "amount")}
        />
        <FieldLabel
          label="Price"
          valueField={price}
          onClick={() => onChangeStep(STEP.HOME, "price")}
        />
        <FieldLabel
          label="Name"
          valueField={name}
          onClick={() => onChangeStep(STEP.HOME, "name")}
        />
      </Box>
    </Wrapper>
  );
};

export default CollectInfo;

const FieldLabel = ({
  label,
  valueField,
  containerProps,
  onClick,
}: {
  label: string;
  valueField: string;
  containerProps?: BoxProps;
  onClick: () => void;
}) => {
  return (
    <Box {...containerProps}>
      <Typography component="span" color="gray" mr={1}>
        {label}
      </Typography>
      <Link
        component="button"
        underline="hover"
        color="inherit"
        fontWeight="550"
        onClick={onClick}
      >
        {valueField}
      </Link>
    </Box>
  );
};
