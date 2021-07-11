import React, { FC, useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChangePasswordSchema } from "@client/validation-schemas";
import { Form } from "@components/Form";
import { Toast } from "@components/Toast";
import { useProfile } from "@hooks/useProfile";

import { ChangePasswordForm } from "./ChangePassword.form";
import { ChangePasswordFormData } from "./types";

const defaultValues: ChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

export const ChangePassword: FC = () => {
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<ChangePasswordFormData>({
    defaultValues,
    resolver: yupResolver(ChangePasswordSchema),
  });
  const { handleSubmit, reset } = methods;

  const { changePassword } = useProfile();

  const onSubmit = useCallback((data: ChangePasswordFormData) => {
    changePassword(data)
      .then(() => reset())
      .catch((error) => setError(String(error)));
  }, []);

  return (
    <FormProvider {...methods}>
      <Form className="shadow-none" onSubmit={handleSubmit(onSubmit)}>
        <ChangePasswordForm />
      </Form>
      {error && <Toast type="error">{error}</Toast>}
    </FormProvider>
  );
};
