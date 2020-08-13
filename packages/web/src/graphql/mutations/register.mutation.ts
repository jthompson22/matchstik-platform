import gql from 'graphql-tag';

const mutation = gql`
  mutation Register($user: UserInput!) {
    register(user: $user) {
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
