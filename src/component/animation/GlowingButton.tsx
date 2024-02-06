"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps, Theme, keyframes } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    --glow-color: hwb(186 38% 8%);
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;

const GlowingButton = () => {
  const faultyFlicker = keyframes`
    0% { opacity: 0.1 }
    2% { opacity: 0.1 }
    4% { opacity: 0.5 }
    19% { opacity: 0.5 }
    21% { opacity: 0.1 }
    23% { opacity: 1 }
    80% { opacity: 0.5 }
    83% { opacity: 0.4 }
    87% { opacity: 1 }
  `;
  const textFlicker = keyframes`
    0% { opacity: 0.1 }
    2% { opacity: 1 }
    9% { opacity: 1 }
    12% { opacity: 0.1 }
    20% { opacity: 1 }
    25% { opacity: 0.3 }
    30% { opacity: 1 }
    70% { opacity: 0.7 }
    72% { opacity: 0.2 }
    77% { opacity: 0.9 }
    100% { opacity: 0.9 }
  `;
  const borderFlicker = keyframes`
    0% { opacity: 0.1 }
    2% {opacity: 1 }
    4% {opacity: 0.1 }
    8% {opacity: 1 }
    70% {opacity: 0.7 }
    100% {opacity: 1 }
`;

  const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

  const btnStyle = {
    width: "fit-content",
    position: "relative",
    color: "var(--glow-color)",
    cursor: "pointer",
    padding: "0.35rem 1rem",
    border: "0.15rem solid var(--glow-color)",
    borderRadius: "0.45rem",
    background: "none",
    perspective: "2rem",
    fontFamily: "Raleway, sans-serif",
    fontSize: "2rem",
    fontWeight: "900",
    letterSpacing: "1rem",
    boxShadow:
      "inset 0 0 .5rem 0 var(--glow-color), 0 0 .5rem 0 var(--glow-color)",
    animation: `${borderFlicker} 2s linear infinite`,
    "&:before": {
      content: `""`,
      position: "absolute",
      backgroundColor: "var(--glow-color)",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: "0.7",
      filter: "blur(1rem)",
      transform: "translateY(120%) rotateX(95deg) scale(1, 0.35)",
    },
    "&:after": {
      content: `""`,
      position: "absolute",
      backgroundColor: "var(--glow-color)",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      zIndex: "-1",
      boxShadow: "0 0 2rem .2rem var(--glow-color)",
      transition: "opacity 100ms linear",
    },
    "&:hover": {
      color: "rgba(0, 0, 0, .8)",
      textShadow: "none",
      animation: "none",
    },
    "&:hover .glowing-txt": {
      animation: "none",
    },
    "&:hover .glowing-letter": {
      animation: "none",
      textShadow: "none",
      opacity: 1,
    },
    "&:hover:before": {
      filter: "blur(1.5rem)",
      opacity: 1,
    },
    "&:hover:after": {
      opacity: 1,
    },
  } as SxProps<Theme>;

  const txtCStyle = {
    textShadow: "0 0 .125rem #ffffff4d, 0 0 .45rem var(--glow-color)",
    animation: `${textFlicker} 3s linear infinite`,
  } as SxProps<Theme>;

  const faultyLetterStyle = {
    opacity: ".5",
    animation: `${faultyFlicker} 2s linear infinite`,
  } as SxProps<Theme>;
  return (
    <Box
      sx={{
        background: "black",
        height: "300px",
        borderRadius: "10px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlobalStyles />
      {/* button */}
      <Button sx={btnStyle}>
        {/* glowing txt */}
        <Box component="span" sx={txtCStyle} className="glowing-txt">
          C
        </Box>
        {/* glowing-lettle */}
        <Box component="span" sx={faultyLetterStyle} className="glowing-letter">
          L
        </Box>
        ICK
      </Button>
    </Box>
  );
};

export default GlowingButton;
