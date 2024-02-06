"use client";

import { useToggle } from "@/hooks/useToggle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const Page = () => {
  const [open, setOpen] = useToggle(false);
  return (
    <Box>
      <Typography variant="h3">Data with SWR</Typography>
      <Button onClick={setOpen}>Open</Button>
      <Popover
        open={open}
        onClose={setOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
};

export default Page;
