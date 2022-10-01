import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/store";

const authState = (state: RootState) => state.auth;

export const isLoginIn = createSelector(authState, (state) => state.loading);

export const getToken = createSelector(authState, (state) => state.token);

export const getPermissions = createSelector(authState, (state) => state.permissions);

export const isLoginError = createSelector(authState, (state) => state.error);
