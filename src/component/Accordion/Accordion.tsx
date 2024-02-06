"use client";

import Box from "@mui/material/Box";
import { useState } from "react";
import AccordionItem from "./AccordionItem";
import Button from "@mui/material/Button";

interface AccordionProps {}
const Accordion = ({}: AccordionProps) => {
  const [list, setList] = useState<AccordionItem[]>([
    {
      id: 1,
      title: "title 1",
      description:
        "Column widths are integer values between 1 and 12. They can be applied at any breakpoint to indicate how many columns are occupied by the component.",
    },
    {
      id: 2,
      title: "title 2",
      description:
        "Column widths are integer values between 1 and 12. They can be applied at any breakpoint to indicate how many columns are occupied by the component.",
    },
    {
      id: 3,
      title: "title 3",
      description:
        "Column widths are integer values between 1 and 12. They can be applied at any breakpoint to indicate how many columns are occupied by the component.",
    },
  ]);

  const [trick, setTrick] = useState<"only" | "multi">("multi");
  const [itemExpan, setItemExpan] = useState<number[]>([]);

  const handleExpan = (id: number) => {
    setItemExpan((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return trick === "multi" ? [...prev, id] : [id];
    });
  };
  return (
    <Box>
      {list.map((item) => {
        return (
          <AccordionItem
            key={item.id}
            accordion={item}
            open={
              trick === "multi"
                ? itemExpan.includes(item.id)
                : itemExpan[0] === item.id
            }
            sx={{
              borderRadius: "5px",
              border: "1px solid",
              marginBottom: "5px",
            }}
            onTitleClick={handleExpan}
          />
        );
      })}
      <Button
        onClick={() => setTrick((prev) => (prev === "only" ? "multi" : "only"))}
      >
        Change trick
      </Button>{" "}
      {trick}
    </Box>
  );
};

export default Accordion;
