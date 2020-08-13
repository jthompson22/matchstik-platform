import gql from 'graphql-tag';

const query = gql`
  query project($projectId: String!) {
    project(projectId: $projectId) {
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
