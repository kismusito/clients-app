import {
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Reducers
import auth from "src/modules/auth";
import clients from "src/modules/clients";
import modal from "src/modules/modal";
import { authType } from "src/modules/auth/types";

const combinedReducer = combineReducers({
  auth,
  clients,
  modal,
});

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === authType.LOGOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
