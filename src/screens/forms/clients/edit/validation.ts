import * as yup from "yup";

export const editClientValidator = yup
  .object({
    _id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    document: yup.string().min(1).max(20).required(),
    bankAccount: yup.string().min(1).max(20).required(),
  })
  .required();
