import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AccordionItemProps {
  accordion: AccordionItem;
  open: boolean;
  onTitleClick: (id: number) => void;
  sx?: BoxProps;
}
const AccordionItem = ({
  accordion,
  open,
  onTitleClick,
  sx,
}: AccordionItemProps) => {
  const { title, id, description } = accordion;
  return (
    <Box sx={sx}>
      <Typography onClick={() => onTitleClick(id)}>{title}</Typography>
      {open ? <Typography>{description}</Typography> : null}
    </Box>
  );
};

export default AccordionItem;
