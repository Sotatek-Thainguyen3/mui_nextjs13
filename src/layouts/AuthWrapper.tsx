"use client";

import { ReactNode, useEffect } from "react";

import { clientStorage } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, SIGNIN_PATH } from "@/constants";
import { _toggleAppReady, _updateAuth } from "@/state/app/reducer";
import { useAppSelector } from "@/state/hooks";
import { toast } from "react-toastify";
import AppLoading from "@/component/Base/AppLoading";

type RootWrapperProps = {
  children: ReactNode;
};
const AuthWrapper = ({ children }: RootWrapperProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const accessToken = clientStorage.get(ACCESS_TOKEN_KEY);
  const publicPaths = ["/signin", "/signup"];
  const path = pathName.split("?")[0];
  const { appReady, notification } = useAppSelector((state) => state.app);

  const isNotAuthor = !accessToken && !publicPaths.includes(path);
  console.log("Stay AuthWrapper", isNotAuthor);

  useEffect(() => {
    if (notification) {
      toast.error(notification);
    }
  }, [notification]);

  useEffect(() => {
    // redirect to login page if accessing a private page and not logged in
    if (isNotAuthor) {
      router.replace(`${SIGNIN_PATH}?redirect=${pathName}`);
    }
  }, [isNotAuthor, pathName, router]);

  console.log("Stay AuthWrapper check", !appReady);

  return <>{!appReady || isNotAuthor ? <AppLoading /> : <>{children}</>}</>;
};

export default AuthWrapper;
