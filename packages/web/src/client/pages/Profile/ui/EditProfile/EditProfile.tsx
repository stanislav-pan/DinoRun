import React, { FC, useCallback, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

import { EditProfileSchema } from "@client/validation-schemas";
import { Form } from "@components/Form";
import { Toast } from "@components/Toast";
import { useProfile } from "@hooks/useProfile";
import { userSelector } from "@redux/user/selectors";

import { IUser } from "@api/interfaces";

import { EditProfileForm } from "./EditProfile.form";
import { EditProfileFormData } from "./types";

export const EditProfile: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { changeProfile } = useProfile();

  const user = useSelector(userSelector);

  const defaultValues: EditProfileFormData = useMemo(() => {
    const { login, firstName, secondName, email, phone } = user as IUser;

    return {
      login,
      firstName,
      secondName,
      email,
      phone,
    };
  }, [user]);

  const methods = useForm<EditProfileFormData>({
    defaultValues,
    resolver: yupResolver(EditProfileSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (data: EditProfileFormData) => {
      changeProfile(data).catch((error) => setError(String(error)));
    },
    [changeProfile]
  );

  return (
    <FormProvider {...methods}>
      <Form className="shadow-none" onSubmit={handleSubmit(onSubmit)}>
        <EditProfileForm />
      </Form>
      {error && <Toast type="error">{error}</Toast>}
    </FormProvider>
  );
};
