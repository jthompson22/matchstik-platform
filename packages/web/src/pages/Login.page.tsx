import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import Button, { ButtonTypes } from "../elements/Button";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import LOGIN from "../graphql/mutations/login.mutation";
import * as Auth from "../utils/Auth";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from "../utils/ErrorUtil";
import makeEventHandler from '../utils/makeEventHandler';
import AuthLayout, {
  Content,
  Row,
  Text,
  Footer,
  ErrorText
} from "../components/AuthLayout";
import { useHistory } from 'react-router-dom';

const schema = Joi.object({
  email: Schema.email().error(([error]) => {
    const message = "Email is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  }),
  password: Schema.password().error(([error]) => {
    const message = "Password is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message
      })
    );
  }),
});

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  /* Hooks */
  const history = useHistory();
  /* State */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    email: null,
    password: null,
  });

  /* Actions */
  const eventHandler = makeEventHandler(() => setError(""));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangeEmail = eventHandler((value: string) => {
    setFieldErrors("email", null);
    setEmail(value);
  });

  const onChangePassword = eventHandler((value: string) => {
    setFieldErrors("password", null);
    setPassword(value);
  });

  /* GraphQL */
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
    onCompleted: async ({ login: { token } }) => {
      await Auth.setToken(token);
      history.push('/dashboard/overview');
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  const login = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const params = schema.validate({
      email,
      password,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError('');
    loginMutation();
  };

  /* Render */
  return (
    <AuthLayout
      title="Welcome back"
      onSubmit={login}
    >
      <Content>
        <Row>
          <LabeledInput
            autoFocus
            label="Email Address"
            placeholder="sigismund@freud.com"
            value={email}
            onChange={onChangeEmail}
            error={fieldErrors["email"]}
          />
        </Row>
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
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          type={ButtonTypes.Submit}
          onClick={() => login()}
          loading={loading}
          text="Login"
          margin="20px 0 0"
        />
        <Footer>
          <Row>
            <Text>Need an account?</Text>&nbsp;
            <Link to="/register">Register</Link>
          </Row>
          <Row>
            <Link to="/forgot-password">Forgot Password</Link>
          </Row>
        </Footer>
      </Content>
    </AuthLayout>
  );
}

export default LoginPage;
