import * as yup from "yup";
import { ErrorMessages } from "./error-messages";

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(ErrorMessages.required),
  newPassword: yup.string().required(ErrorMessages.required),
  newPasswordConfirm: yup
    .string()
    .required(ErrorMessages.required)
    .test(
      "password-match",
      "Passwords do not match",
      function (value: string | undefined): boolean {
        const { newPassword } = this.parent;

        return newPassword === value;
      }
    ),
});
