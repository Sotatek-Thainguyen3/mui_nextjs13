"use client";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AppBox, AppDateRangePicker, AppInput } from "../Base";
import { TypeTypography } from "@/utils/theme";

export function Example() {
  const [radioValueSelected, setRadioValueSelected] = useState<any>(null);
  const [checked, setChecked] = useState([true, true, true]);

  return (
    <>
      <Box p={3}>
        <Stack spacing={3}>
          <Divider>Typography</Divider>
          <Grid container>
            <Grid item xs={4}>
              <Divider>Typography - REG</Divider>
              <Box sx={{ width: "100%", maxWidth: 500 }}>
                <Typography variant="h1" component="div" gutterBottom>
                  Title 1
                </Typography>
                <Typography variant="h2" gutterBottom component="div">
                  h2. Heading
                </Typography>
                <Typography variant="h3" gutterBottom component="div">
                  h3. Heading
                </Typography>
                <Typography variant="h4" gutterBottom component="div">
                  h4. Heading
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  h5. Heading
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                  h6. Heading
                </Typography>
                <Typography variant="copy" gutterBottom component="div">
                  copy
                </Typography>
                <Typography variant="body" gutterBottom component="div">
                  body
                </Typography>
                <Typography variant="label" gutterBottom component="div">
                  label
                </Typography>
                <Typography variant="caption" gutterBottom component="div">
                  caption
                </Typography>
                <Typography variant="small" gutterBottom component="div">
                  small
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Divider>Typography - MED</Divider>
              <Box sx={{ width: "100%", maxWidth: 500 }}>
                <Typography
                  variant="h1"
                  fontWeight="medium"
                  component="div"
                  gutterBottom
                >
                  Title 1
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  h2. Heading
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  h3. Heading
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  h4. Heading
                </Typography>
                <Box
                  // component='span'
                  sx={{
                    typography: "h5" as TypeTypography,
                    fontWeight: "medium",
                  }}
                >
                  h5
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  h5. Heading
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  h6. Heading
                </Typography>
                <Typography
                  variant="copy"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  copy
                </Typography>
                <Typography
                  variant="body"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  body
                </Typography>
                <Typography
                  variant="label"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  label
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  caption
                </Typography>
                <Typography
                  variant="small"
                  fontWeight="medium"
                  gutterBottom
                  component="div"
                >
                  small
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Divider>Typography - BOLD</Divider>
              <Box sx={{ width: "100%", maxWidth: 500 }}>
                <Typography
                  variant="h1"
                  fontWeight="bold"
                  component="div"
                  gutterBottom
                >
                  Title 1
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  h2. Heading
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  h3. Heading
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  h4. Heading
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  h5. Heading
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  h6. Heading
                </Typography>
                <Typography
                  variant="copy"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  copy
                </Typography>
                <Typography
                  variant="body"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  body
                </Typography>
                <Typography
                  variant="label"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  label
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  caption
                </Typography>
                <Typography
                  variant="small"
                  fontWeight="bold"
                  gutterBottom
                  component="div"
                >
                  small
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider>Input</Divider>
          <AppInput />

          <Divider>DateRangePicker</Divider>
          <AppDateRangePicker />

          <Divider>Radio</Divider>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={radioValueSelected}
            onChange={(event) => setRadioValueSelected(event.target.value)}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label="Catalogyo main Category"
            />
            <FormControlLabel value="b" control={<Radio />} label="Product" />
          </RadioGroup>

          <Divider>Checkbox</Divider>
          <Box>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={"Checked"}
            />
            <FormControlLabel control={<Checkbox />} label={"UnChecked"} />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-disabled": { color: "#B1B5C3" },
                  }}
                  checked
                  disabled
                />
              }
              label={"Checked, disabled"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-disabled": { color: "#B1B5C3" },
                  }}
                  disabled
                />
              }
              label={"UnChecked, disabled"}
            />
          </Box>
          <Box mt={"1rem"}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[0] && checked[1] && checked[2]}
                  onChange={(event) => {
                    setChecked((prevState) =>
                      prevState.map((item) => (item = event.target.checked))
                    );
                  }}
                />
              }
              label={"All"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[0]}
                  onChange={(event) =>
                    setChecked((prevState) => {
                      prevState[0] = event.target.checked;
                      return [...prevState];
                    })
                  }
                />
              }
              label={"A"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[1]}
                  onChange={(event) =>
                    setChecked((prevState) => {
                      prevState[1] = event.target.checked;
                      return [...prevState];
                    })
                  }
                />
              }
              label={"B"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked[2]}
                  onChange={(event) =>
                    setChecked((prevState) => {
                      prevState[2] = event.target.checked;
                      return [...prevState];
                    })
                  }
                />
              }
              label={"C"}
            />
            <Button
              onClick={() => {
                const obj: any = {};
                checked[0] && (obj["a"] = "A");
                checked[1] && (obj["b"] = "B");
                checked[2] && (obj["c"] = "C");

                console.log(obj);
              }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
