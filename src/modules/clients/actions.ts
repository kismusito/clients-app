import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "src/store";

import Swal from "sweetalert2";

import { CONFIG } from "src/utils/config";

import { ValidationError } from "src/utils/types";
import { CreateClientDTO } from "./dto/create-client.dto";
import { DeleteClientDto } from "./dto/delete-client.dto";
import { Client } from "./entity/client.entity";
import { clientType } from "./types";
import { closeModal } from "../modal/actions";
import { EditClientDTO } from "./dto/edit-client.dto copy";

export const getClients = createAsyncThunk<
  Client[],
  void,
  { rejectValue: ValidationError; state: RootState }
>(clientType.GET_CLIENTS, async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const request = await axios.get(`${CONFIG.API_URL}clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data.clients;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createClient = createAsyncThunk<
  Client,
  CreateClientDTO,
  { rejectValue: ValidationError; state: RootState }
>(clientType.CREATE_CLIENT, async (data: CreateClientDTO, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const request = await axios.post(`${CONFIG.API_URL}clients`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(closeModal());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: request.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    return request.data.client;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateClient = createAsyncThunk<
  Client,
  EditClientDTO,
  { rejectValue: ValidationError; state: RootState }
>(clientType.UPDATE_CLIENT, async (data: EditClientDTO, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const request = await axios.patch(`${CONFIG.API_URL}clients`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(closeModal());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: request.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    return request.data.client;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteClient = createAsyncThunk<
  Client,
  DeleteClientDto,
  { rejectValue: ValidationError; state: RootState }
>(clientType.DELETE_CLIENT, async ({ id }: DeleteClientDto, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const request = await axios.delete(`${CONFIG.API_URL}clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: request.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    return request.data.client;
  } catch (err) {
    const error: AxiosError<ValidationError> = err as any;

    if (!error.response) {
      throw err;
    }

    throw thunkAPI.rejectWithValue(error.response.data);
  }
});
