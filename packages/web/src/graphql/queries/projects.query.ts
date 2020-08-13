import gql from 'graphql-tag';

const query = gql`
  query projects {
    projects {
      _id
      organizationId
      name
      description
      meta {
        createdAt
        createdBy
        lastUpdatedAt
        lastUpdatedBy
      }
    }
  }
`;

export default query;
