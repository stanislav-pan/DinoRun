import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const SignUpInputSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .matches(/^[a-zA-Zа-яА-Я]+$/, ErrorMessages.invalid),
  second_name: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .matches(/^[a-zA-Zа-яА-Я]+$/, ErrorMessages.invalid),
  login: yup
    .string()
    .trim()
    .required(ErrorMessages.required)
    .min(3, ErrorMessages.moreCharacters(3)),
  phone: yup
    .string()
    .ensure()
    .required(ErrorMessages.required)
    .matches(
      /^[+]?([0-9]{1}[-]?[0-9]{3}[-]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2})$/g,
      ErrorMessages.incorrect("Phone")
    ),
  email: yup
    .string()
    .ensure()
    .required(ErrorMessages.required)
    .matches(
      /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/g,
      ErrorMessages.incorrect("Email")
    ),
  password: yup
    .string()
    .required(ErrorMessages.required)
    .min(6, ErrorMessages.moreCharacters(6))
    .matches(/^(\S+)$/g, ErrorMessages.incorrect("Password")),
});
