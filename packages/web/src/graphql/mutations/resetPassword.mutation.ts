import gql from 'graphql-tag';

const mutation = gql`
  mutation ResetPassword($resetPasswordCode: String!, $password: String!) {
    resetPassword(resetPasswordCode: $resetPasswordCode, password: $password) {
      user {
        _id
        firstName
        lastName
        email
        createdAt
      }
      token
    }
  }
`;

export default mutation;
