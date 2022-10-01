import { createSlice } from "@reduxjs/toolkit";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "./actions";
import { Client } from "./entity/client.entity";
import { clientPrefix } from "./types";

type InitialState = {
  loading: boolean;
  clients: Client[];
  error: undefined;
};

const initialState: InitialState = {
  loading: false,
  clients: [],
  error: undefined,
};

const clientSlice = createSlice({
  name: clientPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.clients = [action.payload, ...state.clients];
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.clients = state.clients.map((client) => {
        if (client._id === action.payload._id) {
          return action.payload;
        }

        return client;
      });
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.clients = state.clients.filter(
        (client) => client._id !== action.payload._id
      );
    });
  },
});

export default clientSlice.reducer;
