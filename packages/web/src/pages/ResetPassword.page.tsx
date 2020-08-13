import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import queryString from "query-string";
import Button, { ButtonTypes } from "../elements/Button";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import RESET_PASSWORD from "../graphql/mutations/resetPassword.mutation";
import * as Auth from "../utils/Auth";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from "../utils/ErrorUtil";
import makeEventHandler from "../utils/makeEventHandler";
import AuthLayout, {
  Content,
  Row,
  Text,
  Footer,
  ErrorText
} from "../components/AuthLayout";
import UrlParams from "../models/interfaces/UrlParams";

const schema = Joi.object({
  password: Schema.password().error(([error]) => {
    const message = "Password is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  }),
  confirmPassword: Schema.password().error(([error]) => {
    const message = "Passwords do not match";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  })
});

type ResetPasswordPageProps = {};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeIsInvalid, setCodeIsInvalid] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    password: null,
    confirmPassword: null
  });

  const { code: resetPasswordCode }: UrlParams = queryString.parse(
    window.location.search
  );

  if (!resetPasswordCode && !codeIsInvalid) {
    setCodeIsInvalid(true);
  }

  const eventHandler = makeEventHandler(() => setError(""));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangePassword = eventHandler((value: string) => {
    setFieldErrors("password", null);
    setPassword(value);
  });

  const onChangeConfirmPassword = eventHandler((value: string) => {
    setFieldErrors("confirmPassword", null);
    setConfirmPassword(value);
  });

  const [resetPasswordMutation, { loading }] = useMutation(RESET_PASSWORD, {
    variables: {
      password,
      resetPasswordCode
    },
    onCompleted: async ({ resetPassword: { token } }) => {
      await Auth.setToken(token);
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  const resetPassword = (event?: React.FormEvent) => {
    if (codeIsInvalid) return;

    if (event) {
      event.preventDefault();
    }

    const params = schema.validate({
      password,
      confirmPassword
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError("");
    resetPasswordMutation();
  };

  return (
    <AuthLayout title="Reset Password" onSubmit={resetPassword}>
      <Content>
        <Row>
          <LabeledInput
            label="Password"
            placeholder="••••••••••••"
            value={password}
            type="password"
            onChange={onChangePassword}
            error={fieldErrors["password"]}
          />
        </Row>
        <Row>
          <LabeledInput
            label="Confirm Password"
            placeholder="••••••••••••"
            value={confirmPassword}
            type="password"
            onChange={onChangeConfirmPassword}
            error={fieldErrors["confirmPassword"]}
          />
        </Row>
        {error && <ErrorText>{error}</ErrorText>}
        {codeIsInvalid && <ErrorText>Invalid password reset link.</ErrorText>}
        <Button
          type={ButtonTypes.Submit}
          onClick={() => resetPassword()}
          loading={loading}
          text="Reset Password"
          margin="20px 0 0"
        />
        <Footer>
          <Row>
            <Text>Remembered?</Text>&nbsp;
            <Link to="/login">Login</Link>
          </Row>
        </Footer>
      </Content>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
