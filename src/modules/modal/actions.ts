import { createAction } from "@reduxjs/toolkit";
import { MODAL_COMPONENT_KEY } from "./data/modal-data";
import { modalTypes } from "./types";

type Props = {
  component: MODAL_COMPONENT_KEY;
  props: any;
};

export const openModal = createAction(modalTypes.OPEN_MODAL, (props: Props) => {
  return {
    payload: props,
  };
});

export const closeModal = createAction(modalTypes.CLOSE_MODAL);
