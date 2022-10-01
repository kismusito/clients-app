import { createSlice } from "@reduxjs/toolkit";
import { closeModal, openModal } from "./actions";
import { MODAL_COMPONENT_KEY } from "./data/modal-data";
import { modalPrefix } from "./types";

export type ModalInitialState = {
  isOpen: boolean;
  component: MODAL_COMPONENT_KEY | null;
  props: any;
};

const initialState: ModalInitialState = {
  isOpen: false,
  component: null,
  props: {},
};

const modalSlice = createSlice({
  name: modalPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openModal, (state, action) => {
      state.isOpen = true;
      state.component = action.payload.component;
      state.props = action.payload.props;
    });
    builder.addCase(closeModal, (state) => {
      state.isOpen = false;
      state.component = null;
      state.props = {};
    });
  },
});

export default modalSlice.reducer;
