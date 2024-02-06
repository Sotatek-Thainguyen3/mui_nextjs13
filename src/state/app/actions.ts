import { AN_ERROR_TRY_AGAIN } from "@/constants";
import { ENDPOINT } from "@/constants/endpoint";
import { apiClient } from "@/lib/apiClient";
import { Auth, UserInfo } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

export type SigninData = {
  email: string;
  password: string;
};

export const signin = createAsyncThunk(
  "app/signin",
  async (data: SigninData, { rejectWithValue }) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await apiClient.post(ENDPOINT.SIGNIN, data);
      if (response?.status === HttpStatusCode.Ok) {
        return response.data as UserInfo & {
          accessToken: string;
          refreshToken: string;
        };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  "app/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Auth>(ENDPOINT.GET_PROFILE);
      if (response?.status === HttpStatusCode.Ok) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
