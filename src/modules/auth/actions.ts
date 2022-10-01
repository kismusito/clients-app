import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CONFIG } from "src/utils/config";
import { ValidationError } from "src/utils/types";

import { LoginDTO } from "./dto/login.dto";
import { LoginResponse } from "./responses/login.response";
import { authType } from "./types";

export const login = createAsyncThunk<
  LoginResponse,
  LoginDTO,
  { rejectValue: ValidationError }
>(authType.LOGIN, async (body: LoginDTO, thunkAPI) => {
  try {
    const request = await axios.post(`${CONFIG.API_URL}auth/login`, body);
    return request.data;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAction(authType.LOGOUT);
