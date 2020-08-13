import gql from 'graphql-tag';

const mutation = gql`
  mutation VerifyEmail($verifyEmailCode: String!) {
    verifyEmail(verifyEmailCode: $verifyEmailCode)
  }
`;

export default mutation;
