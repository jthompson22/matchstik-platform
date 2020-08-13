import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Joi from "@hapi/joi";
import Button, { ButtonTypes } from "../elements/Button";
import LabeledInput from "../elements/LabeledInput";
import Link from "../elements/Link";
import SEND_PASSWORD_RESET from "../graphql/mutations/sendPasswordReset.mutation";
import * as Auth from "../utils/Auth";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from "../utils/ErrorUtil";
import makeEventHandler from "../utils/makeEventHandler";
import AuthLayout, {
  Content,
  Row,
  Text,
  Footer,
  SuccessText,
  ErrorText
} from "../components/AuthLayout";


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
});

type ForgotPasswordPageProps = {};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    email: null,
  });

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


  const [forgotPasswordMutation, { loading }] = useMutation(SEND_PASSWORD_RESET, {
    variables: {
      email,
    },
    onCompleted: () => {
      setSuccess(true);
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  const forgotPassword = (event?: React.FormEvent) => {
    if(event) {
      event.preventDefault();
    }

    const params = schema.validate({ email });
    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }
    
    setError('');
    forgotPasswordMutation();
  };

  return (
    <AuthLayout 
      title="Forgot Password"
      onSubmit={forgotPassword}
    >
      <Content>
        <Row>
          <LabeledInput
            autoFocus
            label="Email"
            placeholder="sigismund@freud.com"
            value={email}
            onChange={onChangeEmail}
            error={fieldErrors["email"]}
          />
        </Row>
        {success && <SuccessText>A password reset email has been sent.</SuccessText>}
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          type={ButtonTypes.Submit}
          onClick={() => forgotPassword()}
          loading={loading}
          text="Send Reset Email"
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
}

export default ForgotPasswordPage;
