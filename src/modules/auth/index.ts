import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";
import { Permission } from "./responses/login.response";
import { authPrefix } from "./types";

type InitialState = {
  loading: boolean;
  token: string | null;
  permissions: Permission;
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  token: null,
  permissions: {},
  error: undefined,
};

const authSlice = createSlice({
  name: authPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.permissions = action.payload.permissions;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      state.error = action.payload?.message || "";
    });
  },
});

export default authSlice.reducer;
