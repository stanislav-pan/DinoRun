import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiService } from "@api/api.service";

import { SignInInputSchema } from "@client/validation-schemas";
import { Form } from "@components/Form";
import { Toast } from "@components/Toast";
import { TEXTS } from "@core/translate";
import { LoginRequest } from "@redux/login/actions";
import { errorSelector } from "@redux/user/selectors";

import { isServer } from "@utils/is-server";
import { SignInView } from "./SignIn.view";

const defaultValues: LoginFormData = {
  login: "",
  password: "",
};

const getOauthRedirectUri = () => {
  let redirectUri = "";

  if (!isServer) {
    redirectUri = location.origin;
  }

  return redirectUri;
};

export const SignInForm: FC = () => {
  const [clientId, setClientId] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector(errorSelector);

  const methods = useForm<LoginFormData>({
    defaultValues,
    resolver: yupResolver(SignInInputSchema),
  });

  const urlWithYa = useMemo(() => {
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${getOauthRedirectUri()}`;
  }, [clientId]);

  useEffect(() => {
    apiService.oauth.getServiceId(getOauthRedirectUri()).then(({ data }) => {
      setClientId(data?.service_Id);
    });
  }, []);

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (loginData: LoginFormData) => {
      dispatch(
        LoginRequest({
          login: loginData.login,
          password: loginData.password,
        })
      );
    },
    [dispatch]
  );

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignInView />
        <div className="flex justify-center mt-4">
          <Link to="/signup" className="hover:underline">
            {TEXTS.OR_SIGN_UP}
          </Link>
        </div>
        {!!clientId && (
          <a
            className="block mt-4 p-1 text-center rounded-lg bg-primary text-white"
            href={urlWithYa}
          >
            {TEXTS.LOGIN_WITH_YA}
          </a>
        )}
      </Form>
      {authError && <Toast type="error">{authError}</Toast>}
    </FormProvider>
  );
};
