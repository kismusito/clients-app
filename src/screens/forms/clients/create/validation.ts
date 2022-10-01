import * as yup from "yup";

export const createClientValidator = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    document: yup.string().min(1).max(20).required(),
    bankAccount: yup.string().min(1).max(20).required(),
  })
  .required();
