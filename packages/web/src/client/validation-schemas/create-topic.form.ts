import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const CreateTopicSchema = yup.object().shape({
  name: yup.string().trim().required(ErrorMessages.required),
  description: yup.string().trim().required(ErrorMessages.required).min(10),
  user: yup.object().shape({
    userId: yup.number(),
    firstName: yup.string(),
    secondName: yup.string(),
    displayName: yup.string(),
    login: yup.string(),
    email: yup.string(),
    phone: yup.string(),
    avatarUrl: yup.string().nullable(),
  }),
});
