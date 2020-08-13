import gql from 'graphql-tag';

const mutation = gql`
  mutation SendPasswordReset($email: String!) {
    sendPasswordReset(email: $email)
  }
`;

export default mutation;
