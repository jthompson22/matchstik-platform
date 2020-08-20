import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import { useHistory } from "react-router-dom";
import Button, { ButtonTypes } from "../elements/Button";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import REGISTER from "../graphql/mutations/register.mutation";
import * as Auth from "../utils/Auth";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from '../utils/ErrorUtil';
import makeEventHandler from '../utils/makeEventHandler';
import AuthLayout, {
  Content,
  Row,
  Text,
  Footer,
  ErrorText,
  Flex,
  Spacer,
  Label,
} from "../components/AuthLayout";

const schema = Joi.object({
  firstName: Joi.string()
    .required()
    .error(([error]) => {
      const message = "First name is required";
      return new Error(
        JSON.stringify({
          field: error.path[0],
          message
        })
      );
    }),
  lastName: Joi.string()
    .required()
    .error(([error]) => {
      const message = "Last name is required.";
      return new Error(
        JSON.stringify({
          field: error.path[0],
          message
        })
      );
    }),
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
  confirmPassword: Schema.password()
    .valid(Joi.ref("password"))
    .error(([error]) => {
      const message = "Passwords do not match";
      return new Error(
        JSON.stringify({
          field: error.path[0],
          message
        })
      );
    })
});

type RegisterPageProps = {};

const RegisterPage: React.FC<RegisterPageProps> = () => {
  /** Hooks */
  const history = useHistory();
  /** State */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrorsInternal] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  /** Actions */
  const eventHandler = makeEventHandler(() => setError(''));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangeFirstName = eventHandler((value: string) => {
    setFieldErrors("firstName", null);
    setFirstName(value);
  });
  
  const onChangeLastName = eventHandler((value: string) => {
    setFieldErrors("lastName", null);
    setLastname(value);
  });

  const onChangeEmail = eventHandler((value: string) => {
    setFieldErrors("email", null);
    setEmail(value);
  });

  const onChangePassword = eventHandler((value: string) => {
    setFieldErrors("password", null);
    setPassword(value);
  });

  const onChangeConfirmPassword = eventHandler((value: string) => {
    setFieldErrors("confirmPassword", null);
    setConfirmPassword(value);
  });

  /** GraphQL */
  const [registerMutation, { loading }] = useMutation(REGISTER, {
    variables: {
      user: {
        firstName,
        lastName,
        email,
        password,
      }
    },
    onCompleted: async ({ register: { token } }) => {
      await Auth.setToken(token);
      history.push('/dashboard/projects');
    },
    onError: async (error) => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    },
  });

  const register = (event?: React.FormEvent) => {
    if(event) {
      event.preventDefault();
    }

    const params = schema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });

    const { error: schemaError } = params;

    if(schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError('');
    registerMutation();
  }

  /** Render */
  return (
    <AuthLayout title="Get started" onSubmit={register}>
      <Content>
        <Label>Let's get some basics</Label>
        <Row>
          <Flex flex="1">
            <LabeledInput
              autoFocus
              // label="First Name"
              placeholder="Your first name"
              value={firstName}
              onChange={onChangeFirstName}
              error={fieldErrors["firstName"]}
            />
          </Flex>
          <Spacer />
          <Flex flex="1">
            <LabeledInput
              // label="Last Name"
              placeholder="Your last name"
              value={lastName}
              onChange={onChangeLastName}
              error={fieldErrors["lastName"]}
            />
          </Flex>
        </Row>
        <Label>Email addresss</Label>
        <Row>
          <LabeledInput
            // label="Email"
            placeholder="Your email"
            value={email}
            onChange={onChangeEmail}
            error={fieldErrors["email"]}
          />
        </Row>
        <Label>Choose a password</Label>
        <Row>
          <LabeledInput
            // label="Password"
            placeholder="Enter password"
            value={password}
            type="password"
            onChange={onChangePassword}
            error={fieldErrors["password"]}
          />
        </Row>
        <Label>Confirm your password</Label>
        <Row>
          <LabeledInput
            // label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            type="password"
            onChange={onChangeConfirmPassword}
            error={fieldErrors["confirmPassword"]}
          />
        </Row>
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          type={ButtonTypes.Submit}
          onClick={() => register()}
          loading={loading}
          text="Register"
          margin="20px 0 0"
        />
        <Footer>
          <Row>
            <Text>Already have an account?</Text>&nbsp;
            <Link to="/login">Login</Link>
          </Row>
        </Footer>
      </Content>
    </AuthLayout>
  );
}

export default RegisterPage;
