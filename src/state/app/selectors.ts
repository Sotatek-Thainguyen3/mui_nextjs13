import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { _clearAuth, _toggleAppReady } from "./reducer";
import { SigninData, signin } from "./actions";
import { shallowEqual } from "react-redux";

export const useAppReady = () => {
  const dispatch = useAppDispatch();
  const appReady = useAppSelector((state) => state.app.appReady);

  const onToggleAppReady = useCallback(
    (newStatus?: boolean) => {
      dispatch(_toggleAppReady(newStatus));
    },
    [dispatch]
  );

  return { appReady, onToggleAppReady };
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.app, shallowEqual);
  const isLoggedIn = useMemo(() => !!token, [token]);

  const onSignin = useCallback(
    async (data: SigninData) => {
      return await dispatch(signin(data)).unwrap();
    },
    [dispatch]
  );

  const onSignOut = useCallback(() => {
    dispatch(_clearAuth());
  }, [dispatch]);

  return { token, user, isLoggedIn, onSignin, onSignOut };
};
