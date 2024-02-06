"use client";

import { Header } from "@/component/common/Header";
import { Main } from "@/component/common/Main";
import { useAppSelector } from "@/state/hooks";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { appReady, notification } = useAppSelector(
    (state) => state.app,
    shallowEqual
  );
  console.log("Stay Main", appReady);
  useEffect(() => {
    console.log("notification", notification);
    if (notification && notification.length > 0) {
      toast.error(notification[0]);
    }
  }, [notification]);
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default MainLayout;
