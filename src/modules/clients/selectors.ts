import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/store";

const clientState = (state: RootState) => state.clients;

export const getClientsItems = createSelector(
  clientState,
  (state) => state.clients
);
