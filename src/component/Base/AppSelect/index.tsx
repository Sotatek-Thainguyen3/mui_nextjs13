import React from "react";
import {
  Select as BaseSelect,
  selectClasses,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import { SxProps } from "@mui/system";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { Popper as BasePopper } from "@mui/base/Popper";
import { styled } from "@mui/system";
import IconUp from "src/assets/icons/up.svg";
import IconDown from "src/assets/icons/down.svg";
import Box from "@mui/material/Box";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button
      type="button"
      {...other}
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {other.children}
      {ownerState?.open ? <IconUp /> : <IconDown />}
    </button>
  );
});

const StyleRoot = styled(Button, { shouldForwardProp: () => true })(
  ({ theme, sx }) => `
font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }

  // &.${selectClasses.expanded} {
  //   &::after {
  //     content: '▴';
  //   }
  // }
  //
  // &::after {
  //   content: '▾';
  //   float: right;
  // }
`
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

const SelectOption = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 12px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(BasePopper)`
  z-index: 1;
  width: 100%;
  right: 3rem !important;
`;

export interface IAppSelect<TValue extends {}, Multiple extends boolean>
  extends SelectProps<TValue, Multiple> {
  sx?: SxProps;
}

export const AppSelect = React.forwardRef(function AppSelect<
  TValue extends {},
  Multiple extends boolean
>(
  { sx, ...props }: IAppSelect<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    Root: StyleRoot,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.slots,
  };
  return (
    <Box
      position={"relative"}
      sx={{
        ...sx,
      }}
    >
      <BaseSelect {...props} ref={ref} slots={slots} />
    </Box>
  );
});

export { SelectOption };
