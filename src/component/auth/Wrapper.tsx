"use client";

import Box from "@mui/material/Box";
import { ReactNode, useEffect } from "react";
import { useAppReady, useAuth } from "@/state/app/selectors";
import { useRouter, useSearchParams } from "next/navigation";
import { HOME_PAGE } from "@/constants";
import AppLoading from "../Base/AppLoading";
import dayjs from "dayjs";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { appReady } = useAppReady();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = searchParams.get("redirect");
      replace(redirectTo || HOME_PAGE);
    }
  }, [isLoggedIn, replace, searchParams]);

  const MIN_YEAR = 2023;
  const previousYear = dayjs("2023-01-01").subtract(1, "year").format("YYYY");
  console.log(+previousYear < MIN_YEAR ? MIN_YEAR : previousYear);

  console.log(appReady, isLoggedIn, user);

  if (isLoggedIn) return null;

  return (
    <Box height="100%">
      {!appReady ? (
        <AppLoading />
      ) : (
        <Box
          height="100%"
          sx={{
            background: "url(/images/nature.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Wrapper;
