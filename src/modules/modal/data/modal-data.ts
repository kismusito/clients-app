import { CreateClientForm } from "src/screens/forms/clients/create";
import { EditClientForm } from "src/screens/forms/clients/edit";

export const MODAL_COMPONENT = {
  CREATE_CLIENT_FORM: CreateClientForm,
  EDIT_CLIENT_FORM: EditClientForm,
};

export enum MODAL_COMPONENT_KEY {
  CREATE_CLIENT = "CREATE_CLIENT_FORM",
  EDIT_CLIENT = "EDIT_CLIENT_FORM",
}
