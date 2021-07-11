import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const SendMessageSchema = yup.object().shape({
  text: yup.string().trim().required(ErrorMessages.required).min(10),
});
