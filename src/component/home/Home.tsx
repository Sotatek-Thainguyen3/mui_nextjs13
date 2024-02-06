"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { Step } from "../step";

const Home = () => {
  const [count, setCount] = useState(false);
  const refCount = useRef(0);

  //   const handleCount = () => {
  //     setTimeout(() => {
  //       console.log("triggle", count);

  //       setCount((count) => count + 1);
  //     }, 3000);
  //   };

  const handleCount = () => {
    refCount.current++;
    // setCount((count) => !count);
  };
  const handleOpenModal = () => {
    setTimeout(() => {
      console.log(refCount.current);
    }, 3000);
  };

  return <Step />;
};

export default Home;
