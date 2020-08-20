import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import queryString from "query-string";
import Button, { ButtonTypes } from "../elements/Button";
import Link from "../elements/Link";
import Loader, { LoaderSizes } from "../elements/Loader";
import { Colors } from '../styles/Colors';
import VERIFY_EMAIL from "../graphql/mutations/verifyEmail.mutation";
import * as ErrorUtil from "../utils/ErrorUtil";
import AuthLayout, {
  Content,
  Row,
  Text,
  Footer,
  ErrorText
} from "../components/AuthLayout";
import UrlParams from "../models/interfaces/UrlParams";



const LoaderContainer = styled.div`
  height: 160px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

type VerifyEmailPageProps = {
  history: any;
};

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ history }) => {
  const [codeIsInvalid, setCodeIsInvalid] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { code: verifyEmailCode }: UrlParams = queryString.parse(
    window.location.search
  );

  if (!verifyEmailCode && !codeIsInvalid) {
    setCodeIsInvalid(true);
  }

  const [verifyEmailMutation, { loading }] = useMutation(VERIFY_EMAIL, {
    variables: {
      verifyEmailCode
    },
    onCompleted: ({ verifyEmail }) => {
      setSuccess(verifyEmail);
    },
    onError: async error => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    }
  });

  useEffect(() => {
    if (codeIsInvalid) return;
    setError("");
    verifyEmailMutation();
  }, []);

  let title = 'Verifying Email...';

  if(error || codeIsInvalid) {
    title = 'Email Verification Failed';
  }

  if(success) {
    title = 'Email Verified!';
  }

  return (
    <AuthLayout title={title}>
      <Content>
        {() => {
          if (loading) {
            return (
              <LoaderContainer>
                <Loader color={Colors.Pink} />
              </LoaderContainer>
            );
          }
        }}
        {error && <ErrorText large>{error}</ErrorText>}
        {codeIsInvalid && (
          <ErrorText large>Invalid password reset link.</ErrorText>
        )}
        {success && (
          <Button
            type={ButtonTypes.Submit}
            onClick={() => history.push("/dashboard")}
            text="View Dashboard"
          />
        )}
      </Content>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
