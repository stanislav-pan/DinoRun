import React, { FC, useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { SignUpInputSchema } from "@client/validation-schemas";
import { Form } from "@components/Form";
import { Toast } from "@components/Toast";
import { TEXTS } from "@core/translate";
import { useAuth } from "@hooks/useAuth";

import { SignUpView } from "./SignUp.view";

const defaultValues: SignUpFormData = {
  first_name: "",
  second_name: "",
  login: "",
  email: "",
  phone: "",
  password: "",
};

export const SignUpForm: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();

  const methods = useForm<SignUpFormData>({
    defaultValues,
    resolver: yupResolver(SignUpInputSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (signUpData: SignUpFormData) => {
      signup(signUpData).catch((error) => setError(String(error)));
    },
    [signup]
  );

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpView />
        <div className="flex justify-center mt-4">
          <Link to="/login" className="hover:underline">
            {TEXTS.OR_SIGN_IN}
          </Link>
        </div>
      </Form>
      {error && <Toast type="error">{error}</Toast>}
    </FormProvider>
  );
};
