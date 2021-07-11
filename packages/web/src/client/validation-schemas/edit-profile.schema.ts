import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const EditProfileSchema = yup.object().shape({
  login: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .min(3, ErrorMessages.moreCharacters(3)),

  firstName: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .matches(/^[a-zA-Zа-яА-Я]+$/, ErrorMessages.invalid),

  secondName: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .matches(/^[a-zA-Zа-яА-Я]+$/, ErrorMessages.invalid),

  email: yup
    .string()
    .ensure()
    .required(ErrorMessages.required)
    .matches(
      /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/g,
      ErrorMessages.incorrect("Email")
    ),

  phone: yup
    .string()
    .ensure()
    .required(ErrorMessages.required)
    .matches(
      /^[+]?([0-9]{1}[-]?[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2})$/g,
      ErrorMessages.incorrect("Phone")
    ),
});
