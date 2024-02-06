import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { Auth, UserInfo } from "@/types/user";
import { clientStorage } from "@/utils/storage";
import { ACCESS_TOKEN_KEY } from "@/constants";
import { getProfile, signin } from "./actions";
import axios from "axios";

export interface AppState {
  appReady: boolean;
  token?: string;
  user?: Auth;
  notification?: string;

  tokenRegister?: string;
  isExpandedSidebar: boolean;
}

const initialState: AppState = {
  appReady: false,
  isExpandedSidebar: true,
};

const todoReducer = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    _toggleAppReady: (state, action: PayloadAction<boolean | undefined>) => {
      state.appReady = action.payload ? action.payload : !state.appReady;
    },
    _updateAuth: (
      state,
      action: PayloadAction<{
        accessToken?: string | null;
        user?: Auth | null;
      }>
    ) => {
      state.token = action.payload.accessToken as string;
      state.user = action.payload.user || undefined;
    },
    _clearAuth: (state) => {
      state.token = undefined;
      state.user = undefined;
      clientStorage.remove(ACCESS_TOKEN_KEY);
    },
    _reset: () => ({ ...initialState, appReady: true }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        const { access_token, user } = action.payload;

        clientStorage.set(ACCESS_TOKEN_KEY, access_token);
        state.token = access_token;
        state.user = user;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<Auth>) => {
        state.user = action.payload;
        state.appReady = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.appReady = true;
        if (axios.isAxiosError(action.payload)) {
          const response = action.payload?.response;
          const message = response?.data.message;
          // state.notification = message;
        }
      });
  },
});

const { reducer, actions } = todoReducer;

export const selectApp = (state: RootState) => state.app;
export const { _toggleAppReady, _updateAuth, _clearAuth, _reset } = actions;
export default reducer;
