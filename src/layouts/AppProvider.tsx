"use client";

import { ACCESS_TOKEN_KEY } from "@/constants";
import { getProfile } from "@/state/app/actions";
import { _toggleAppReady, _updateAuth } from "@/state/app/reducer";
import { store } from "@/state/configureStore";
import { clientStorage } from "@/utils/storage";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import ThemeProviderMUI from "./ThemeProviderUI";

type AppProviderProps = {
  children: ReactNode;
};
const AppProvider = ({ children }: AppProviderProps) => {
  const pathName = usePathname();
  const accessToken = clientStorage.get(ACCESS_TOKEN_KEY);

  useEffect(() => {
    store.dispatch(_updateAuth({ accessToken }));
    if (accessToken) {
      store.dispatch(getProfile());
    } else {
      store.dispatch(_toggleAppReady(true));
    }
  }, [accessToken, pathName]);

  const onSetViewHeight = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    onSetViewHeight();
    window.addEventListener("resize", () => {
      onSetViewHeight();
    });
  }, [onSetViewHeight]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <ThemeProviderMUI>{children}</ThemeProviderMUI>
    </Provider>
  );
};

export default AppProvider;
