import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const SignInInputSchema = yup.object().shape({
  login: yup.string().trim().required(ErrorMessages.required),
  password: yup.string().required(ErrorMessages.required),
});
